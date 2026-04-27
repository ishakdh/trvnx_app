import React, { useState, useEffect } from 'react';

const VITE_API_URL = "https://server.trvnx.com/api";

const PaymentReceiveTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${VITE_API_URL}/payment/transactions`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('trvnx_token')}`
                    }
                });
                const result = await response.json();
                if (result.success) {
                    setTransactions(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="max-w-7xl mx-auto mt-4">
            <div className="bg-[#111A35] border border-[#273A60] rounded-xl shadow-2xl overflow-hidden uppercase font-bold">

                {/* Header Section */}
                <div className="p-6 bg-[#162447] border-b border-[#273A60] flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black tracking-widest text-green-400">PAYMENT RECEIVE WEBHOOK</h2>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">
                            AUTOMATED SMS LOGS FOR BKASH & NAGAD
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-[9px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30 hover:bg-green-500/40 transition-all font-black"
                    >
                        ↻ SYNC_DATA
                    </button>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[9px] whitespace-nowrap">
                        <thead className="bg-[#050A15] text-gray-500 tracking-widest">
                        <tr>
                            <th className="p-5">SENDER NUMBER</th>
                            <th className="p-5">TRANSACTION ID</th>
                            <th className="p-5">GATEWAY</th>
                            <th className="p-5 text-right">AMOUNT</th>
                            <th className="p-5 text-center">STATUS</th>
                            <th className="p-5 text-right">RECEIVED AT</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[#273A60]">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-green-500 animate-pulse font-black tracking-widest">
                                    SYNCING WITH PAYMENT GATEWAY...
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-600 italic tracking-widest">
                                    NO SMS PAYMENTS DETECTED IN LOGS.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx._id} className="hover:bg-[#0A1128] transition-colors">
                                    <td className="p-5 text-white font-mono">{tx.senderNumber}</td>
                                    <td className="p-5 text-blue-400 font-mono tracking-widest">{tx.trxId}</td>
                                    <td className="p-5">
                       <span className={`px-2 py-1 rounded text-[8px] border ${tx.gateway.toUpperCase() === 'BKASH' ? 'bg-pink-900/30 text-pink-400 border-pink-500/30' : 'bg-orange-900/30 text-orange-400 border-orange-500/30'}`}>
                         {tx.gateway.toUpperCase()}
                       </span>
                                    </td>
                                    <td className="p-5 text-right font-black text-green-400 text-sm">
                                        ৳{tx.amount}
                                    </td>
                                    <td className="p-5 text-center">
                                        {tx.status === 'WAITING' && <span className="bg-yellow-900/40 text-yellow-500 border border-yellow-900/50 px-3 py-1.5 rounded text-[8px] font-black animate-pulse">WAITING FOR REQ</span>}
                                        {tx.status === 'SUCCESS' && <span className="bg-green-900/40 text-green-500 border border-green-900/50 px-3 py-1.5 rounded text-[8px] font-black">SUCCESS</span>}
                                        {tx.status === 'REJECTED' && <span className="bg-red-900/40 text-red-500 border border-red-900/50 px-3 py-1.5 rounded text-[8px] font-black">REJECTED</span>}
                                    </td>
                                    <td className="p-5 text-right text-gray-400 font-mono text-[8px]">
                                        {new Date(tx.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentReceiveTable;