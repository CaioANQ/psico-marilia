/**
 * Gerador de payload PIX "copia e cola" (BR Code / EMV-MPM, padrão Banco Central).
 * Referência: Manual de Padrões para Iniciação do PIX (Bacen).
 */

function emv(id: string, value: string): string {
  return id + String(value.length).padStart(2, "0") + value;
}

/** CRC16-CCITT (0x1021, inicial 0xFFFF) sobre o payload, como exige o campo 63. */
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export type PixParams = {
  chave: string;
  nomeRecebedor: string;
  cidade: string;
  valor?: number;
  txid?: string;
};

export function pixPayload({
  chave,
  nomeRecebedor,
  cidade,
  valor,
  txid = "***",
}: PixParams): string {
  const payload =
    [
      emv("00", "01"),
      emv("26", emv("00", "br.gov.bcb.pix") + emv("01", chave)),
      emv("52", "0000"),
      emv("53", "986"),
      valor && valor > 0 ? emv("54", valor.toFixed(2)) : "",
      emv("58", "BR"),
      emv("59", nomeRecebedor.slice(0, 25)),
      emv("60", cidade.slice(0, 15)),
      emv("62", emv("05", txid.slice(0, 25))),
    ].join("") + "6304";

  return payload + crc16(payload);
}
