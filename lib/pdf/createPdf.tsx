"use server";

import ReactPdf from "@react-pdf/renderer";
import { SchemaPdf } from "./SchemaPdf";

export const createPdf = async () => {
  const pdfBuffer = await ReactPdf.renderToBuffer(<SchemaPdf />);
  return pdfBuffer;
};
