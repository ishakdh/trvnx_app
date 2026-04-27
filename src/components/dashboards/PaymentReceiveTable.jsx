import React, { useState, useEffect } from 'react';

const PaymentReceiveTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the data from your new admin route
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/payment/transactions');
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

    const getStatusStyle = (status) => {
        switch (status) {
            case 'WAITING':
                return 'bg-yellow-100 text-yellow-800';
            case 'SUCCESS':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Payment Receive</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Automated SMS webhook logs for bKash and Nagad.
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sender Number
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transaction ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gateway
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Received At
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        Loading transactions...
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No SMS payments received yet.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {tx.senderNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                            {tx.trxId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                            Tk {tx.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(tx.status)}`}>
                          {tx.status === 'WAITING' ? 'Waiting for Request' : tx.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tx.gateway}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
        </div>
    );
};

export default PaymentReceiveTable;