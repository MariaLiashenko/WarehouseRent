export const userColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
        field: "user",
        headerName: "User",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },

    {
        field: "password",
        headerName: "Password",
        width: 270,
    },
];
export const reservationsColumns = [
    { field: "_id", headerName: "ID", width: 160 },
    {
        field: "user",
        headerName: "User Id",
        width: 160,
    },
    {
        field: "warehouse",
        headerName: "Warehouse Id",
        width: 160,
    },
    {
        field: "startDate",
        headerName: "startDate",
        width: 150,
    },
    {
        field: "endDate",
        headerName: "endDate",
        width: 150,
    },
    {
        field: "totalPrice",
        headerName: "Total Price",
        width: 150,
    },
];
export const warehousesColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
        field: "en.name",
        headerName: "Name(English)",
        width: 100,
    },
    {
        field: " en ",
        headerName: "Description(English)",
        width: 230,
    },
    {
        field: "ukr",
        headerName: "Description",
        width: 200,
    },
    {
        field: "electricity",
        headerName: "Electricity",
        width: 100,
    },
    {
        field: "plumbing",
        headerName: "Plumbing",
        width: 100,
    },
    {
        field: "priceMonth",
        headerName: "PriceMonth",
        width: 100,
    },
    {
        field: "priceYear",
        headerName: "PriceYear",
        width: 100,
    },
];
