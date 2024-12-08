const table_data = [
    {
        id: 1,
        tableNumber: "Bàn 1",
        capacity: "1-2",
        location: "Trong nhà",
        status: "available", // available, booked
        description: "Bàn đôi view cửa sổ",
        price: "0", // Phí đặt bàn (nếu có)
        timeSlots: [
            {
                time: "11:00",
                status: "available"
            },
            {
                time: "12:00",
                status: "booked"
            },
            {
                time: "13:00",
                status: "available"
            }
        ]
    },
    {
        id: 2,
        tableNumber: "Bàn 2",
        capacity: "3-5",
        location: "Trong nhà",
        status: "available",
        description: "Bàn tròn phù hợp cho gia đình",
        price: "0",
        timeSlots: [
            {
                time: "11:00",
                status: "available"
            },
            {
                time: "12:00",
                status: "available"
            },
            {
                time: "13:00",
                status: "booked"
            }
        ]
    },
    {
        id: 3,
        tableNumber: "Bàn 3",
        capacity: "6-10",
        location: "Trong nhà",
        status: "booked",
        description: "Bàn lớn phù hợp cho nhóm",
        price: "0",
        timeSlots: [
            {
                time: "11:00",
                status: "booked"
            },
            {
                time: "12:00",
                status: "booked"
            },
            {
                time: "13:00",
                status: "available"
            }
        ]
    },
    {
        id: 4,
        tableNumber: "Bàn VIP 1",
        capacity: "6-10",
        location: "Phòng riêng",
        status: "available",
        description: "Phòng VIP có view thành phố",
        price: "500.000",
        timeSlots: [
            {
                time: "11:00",
                status: "available"
            },
            {
                time: "12:00",
                status: "available"
            },
            {
                time: "13:00",
                status: "available"
            }
        ]
    },
    {
        id: 5,
        tableNumber: "Bàn sân vườn 1",
        capacity: "3-5",
        location: "Ngoài trời",
        status: "available",
        description: "Bàn view sân vườn thoáng mát",
        price: "0",
        timeSlots: [
            {
                time: "11:00",
                status: "available"
            },
            {
                time: "12:00",
                status: "available"
            },
            {
                time: "13:00",
                status: "available"
            }
        ]
    },
    {
        id: 6,
        tableNumber: "Bàn sân vườn 2",
        capacity: "1-2",
        location: "Ngoài trời",
        status: "booked",
        description: "Bàn đôi view sân vườn lãng mạn",
        price: "0",
        timeSlots: [
            {
                time: "11:00",
                status: "booked"
            },
            {
                time: "12:00",
                status: "available"
            },
            {
                time: "13:00",
                status: "available"
            }
        ]
    },
    {
        id: 7,
        tableNumber: "Bàn VIP 2",
        capacity: "10+",
        location: "Phòng riêng",
        status: "available",
        description: "Phòng VIP lớn cho tiệc nhóm",
        price: "1.000.000",
        timeSlots: [
            {
                time: "11:00",
                status: "available"
            },
            {
                time: "12:00",
                status: "available"
            },
            {
                time: "13:00",
                status: "available"
            }
        ]
    },
    {
        id: 8,
        tableNumber: "Bàn 4",
        capacity: "3-5",
        location: "Trong nhà",
        status: "available",
        description: "Bàn góc yên tĩnh",
        price: "0",
        timeSlots: [
            {
                time: "11:00",
                status: "available"
            },
            {
                time: "12:00",
                status: "available"
            },
            {
                time: "13:00",
                status: "available"
            }
        ]
    }
];

// Thêm các hàm tiện ích
export const getAvailableTables = (capacity, time) => {
    return table_data.filter(table => {
        const timeSlot = table.timeSlots.find(slot => slot.time === time);
        return table.capacity === capacity && timeSlot && timeSlot.status === "available";
    });
};

export const getTableById = (id) => {
    return table_data.find(table => table.id === id);
};

export const getTablesByLocation = (location) => {
    return table_data.filter(table => table.location === location);
};

// Thêm hàm để cập nhật trạng thái bàn
export const updateTableStatus = (tableId, newStatus) => {
    const tableIndex = table_data.findIndex(table => table.id === tableId);
    if (tableIndex !== -1) {
        table_data[tableIndex].status = newStatus;
    }
    return [...table_data];
};

export default table_data; 