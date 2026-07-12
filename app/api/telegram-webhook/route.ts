import { NextRequest, NextResponse } from "next/server";
import { saveOperativo } from "@/lib/operativos";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (!process.env.TELEGRAM_WEBHOOK_SECRET || secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let update: any;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const message = update.message ?? update.channel_post;
  const text: string | undefined = message?.text ?? message?.caption;

  if (!message || !text) {
    return NextResponse.json({ ok: true, skipped: "no text" });
  }

  const allowedChatId = process.env.TELEGRAM_CHAT_ID;
  if (allowedChatId && String(message.chat?.id) !== allowedChatId) {
    return NextResponse.json({ ok: true, skipped: "chat not allowed" });
  }

  await saveOperativo({
    id: message.message_id,
    chatId: message.chat.id,
    text: text.slice(0, 2000),
    date: (message.date ?? Math.floor(Date.now() / 1000)) * 1000,
    author: message.from?.first_name ?? message.chat?.title ?? "Grupo",
  });

  return NextResponse.json({ ok: true });
}

// Telegram no llama a GET; se usa solo para verificar que la ruta está viva.
export async function GET() {
  return NextResponse.json({ ok: true, message: "Telegram webhook activo" });
}
