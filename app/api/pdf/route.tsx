import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { SchemaPdf } from "@/lib/pdf/SchemaPdf";

export async function GET() {
  console.log("in pdf route");
  const pdfBuffer = await renderToBuffer(<SchemaPdf />);
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    },
  });
}
