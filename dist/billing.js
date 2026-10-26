// UI-only price preview. Stream checkout remains authoritative.
window.quoteProgram = function quoteProgram(amountCents, discountPercent, installments) {
  if (!Number.isSafeInteger(amountCents) || amountCents <= 0) throw new Error('Invalid program amount');
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) throw new Error('Invalid discount');
  if (!Number.isInteger(installments) || installments < 1 || installments > 12) throw new Error('Invalid installment count');
  const discountCents = Math.round(amountCents * discountPercent / 100);
  const base = Math.floor(amountCents / installments);
  return {
    amountCents,
    fullPaymentCents: amountCents - discountCents,
    discountCents,
    installmentsCents: Array.from({length: installments}, (_,i) => i === installments-1 ? amountCents-base*(installments-1) : base)
  };
};
