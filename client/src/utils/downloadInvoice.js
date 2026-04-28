import jsPDF from "jspdf";

export function downloadInvoice(booking) {
  const doc = new jsPDF();

  const invoiceNumber = booking.bookingRef;
  const isCancelled = booking.bookingStatus === "cancelled";

  const fileName = isCancelled
    ? `cancellation-record-${invoiceNumber}.pdf`
    : `invoice-${invoiceNumber}.pdf`;

  doc.setFillColor(isCancelled ? 220 : 5, isCancelled ? 38 : 150, isCancelled ? 38 : 105);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("TourismHub LK", 14, 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(isCancelled ? "Cancellation Record" : "Booking Invoice", 14, 26);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(isCancelled ? "CANCELLED" : "INVOICE", isCancelled ? 136 : 150, 50);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Reference No: ${invoiceNumber}`, 14, 48);
  doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 56);

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 70, 182, 78, 4, 4, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Details", 22, 82);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const leftX = 22;
  const rightX = 112;
  let y = 96;

  doc.setFont("helvetica", "bold");
  doc.text("Booking Reference:", leftX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.bookingRef), 60, y);

  doc.setFont("helvetica", "bold");
  doc.text("Hotel Name:", rightX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.hotel.name), 140, y);

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Room Type:", leftX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.room.name), 60, y);

  doc.setFont("helvetica", "bold");
  doc.text("Stay Dates:", rightX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.dates), 140, y);

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Guests:", leftX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.guests), 60, y);

  doc.setFont("helvetica", "bold");
  doc.text("Booking Status:", rightX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.bookingStatus), 148, y);

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text("Payment Status:", leftX, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(booking.paymentStatus), 60, y);

  doc.setFillColor(isCancelled ? 254 : 239, isCancelled ? 226 : 246, isCancelled ? 226 : 255);
  doc.roundedRect(14, 160, 182, 28, 4, 4, "F");

  doc.setTextColor(isCancelled ? 153 : 30, isCancelled ? 27 : 64, isCancelled ? 27 : 175);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(isCancelled ? "Cancelled Booking Amount" : "Total Amount", 22, 178);

  doc.setFontSize(18);
  doc.text(`LKR ${Number(booking.total).toLocaleString()}`, 145, 178);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const statusNote = isCancelled
    ? "Note: This booking has been cancelled. This document is a cancellation record."
    : "Note: Please present this invoice during hotel check-in.";

  doc.text(statusNote, 14, 204);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, 260, 196, 260);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.text("Thank you for using TourismHub LK.", 14, 270);
  doc.text("This document was generated electronically.", 14, 276);

  doc.save(fileName);
}