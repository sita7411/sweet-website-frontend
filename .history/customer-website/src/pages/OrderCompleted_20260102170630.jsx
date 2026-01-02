import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Features from "../components/Features/Features";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

/* ================= ORDER DATA (Updated to match your invoice image) ================= */

const invoiceNumber = "891";
const invoiceDate = "02/01/2026";  // Current date as per your setup

const orderItems = [
    { 
        id: 1, 
        title: "Home Baked Apple Pie", 
        quantity: 6, 
        unit: "slice", 
        rate: 1.64, 
        tax: 0.00, 
        amount: 9.84 
    },
    { 
        id: 2, 
        title: "Glazed Yeast Doughnuts", 
        quantity: 15, 
        unit: "piece", 
        rate: 1.50, 
        tax: 0.00, 
        amount: 22.50 
    },
    { 
        id: 3, 
        title: "Chocolate Chip Cookies", 
        quantity: 100, 
        unit: "cookie", 
        rate: 2.00, 
        tax: 0.00, 
        amount: 200.00 
    },
];

const subtotal = 225.89;
const discount = 0.00;
const taxTotal = 0.00;
const paid = 0.00;
const total = 225.89;

/* ================= COMPONENT ================= */

export default function OrderCompleted() {
    const downloadInvoice = async () => {
        const element = document.getElementById("invoice-pdf");

        // Temporarily make visible and position offscreen for capture
        element.style.position = "absolute";
        element.style.left = "-9999px";
        element.style.top = "-9999px";
        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.zIndex = "1000";
        element.style.width = "210mm";  // A4 width
        element.style.minHeight = "297mm";
        element.style.padding = "20mm";
        element.style.boxSizing = "border-box";

        // Wait for any potential reflow
        await new Promise((res) => setTimeout(res, 200));

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const pageHeight = (canvas.height * pdfWidth) / canvas.width;

        if (pageHeight > pdfHeight) {
            // If content is taller than one page, add multiple pages (rare for invoice)
            let position = 0;
            while (position < canvas.height) {
                if (position > 0) pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, -position * pdfWidth / canvas.width, pdfWidth, pageHeight);
                position += pdfHeight * canvas.width / pdfWidth;
            }
        } else {
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pageHeight);
        }

        pdf.save(`invoice-${invoiceNumber}.pdf`);

        // Hide again
        element.style.opacity = "0";
        element.style.visibility = "hidden";
        element.style.zIndex = "-1";
    };

    return (
        <div className="min-h-screen">
            {/* Your existing hero, success message, order info, items list, totals, actions remain unchanged */}
            {/* ... (keep all your existing JSX above the hidden div) ... */}

            {/* ================= HIDDEN PDF DIV - NOW MATCHES THE IMAGE EXACTLY ================= */}
            <div 
                id="invoice-pdf" 
                className="fixed top-0 left-0 opacity-0 invisible -z-10 bg-white text-black font-sans"
                style={{ width: '210mm', minHeight: '297mm', padding: '20mm', boxSizing: 'border-box' }}
            >
                <InvoicePDF />
            </div>

            <Features />
        </div>
    );
}

/* ================= INVOICE PDF CONTENT - REPLICATED TO LOOK IDENTICAL ================= */
function InvoicePDF() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    {/* Replace with your actual logo path or use a placeholder */}
                    <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">Logo</span>
                    </div>
                    <h1 className="text-2xl font-bold">Milky Bakery</h1>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold text-blue-900 border-b-4 border-blue-900 pb-1 inline-block">INVOICE</h2>
                </div>
            </div>

            {/* Invoice Info */}
            <div className="mb-8 text-sm">
                <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
                <p><strong>Date:</strong> {invoiceDate}</p>
            </div>

            {/* Bill From / Bill To */}
            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                    <p className="font-semibold mb-2">Bill from:</p>
                    <p>Company Name</p>
                    <p>Street Address, Zip Code</p>
                    <p>Phone Number</p>
                </div>
                <div>
                    <p className="font-semibold mb-2">Bill to:</p>
                    <p>Customer Name</p>
                    <p>Street Address, Zip Code</p>
                    <p>Phone Number</p>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-sm border-collapse border border-gray-400 mb-8">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-400 px-4 py-2 text-left">Item</th>
                        <th className="border border-gray-400 px-4 py-2 text-center">Quantity</th>
                        <th className="border border-gray-400 px-4 py-2 text-center">Rate</th>
                        <th className="border border-gray-400 px-4 py-2 text-center">Tax</th>
                        <th className="border border-gray-400 px-4 py-2 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-400 px-4 py-2">
                                {item.title}
                                <br />
                                <span className="text-gray-600 text-xs">per {item.unit}</span>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                {item.quantity}
                                <br />
                                <span className="text-gray-600 text-xs">{item.unit}</span>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                ${item.rate.toFixed(2)}
                                <br />
                                <span className="text-gray-600 text-xs">per {item.unit}</span>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">${item.tax.toFixed(2)}</td>
                            <td className="border border-gray-400 px-4 py-2 text-right">${item.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-8">
                <div className="w-64 text-sm">
                    <div className="flex justify-between py-1"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between py-1"><span>Discount:</span><span>${discount.toFixed(2)}</span></div>
                    <div className="flex justify-between py-1"><span>Tax:</span><span>${taxTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between py-1"><span>Paid:</span><span>${paid.toFixed(2)}</span></div>
                </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-end">
                <div className="bg-blue-900 text-white px-8 py-4 rounded">
                    <span className="text-lg font-bold">Total ${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Terms */}
            <div className="mt-12 text-sm">
                <p className="font-semibold">Terms & Conditions:</p>
                {/* Add your terms here if needed */}
            </div>
        </div>
    );
}