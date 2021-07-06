import React from 'react';

const NotFound = () => {
    const notFound = {
        textAlign: "center",
        textTransform: "capitalize"
    }
    const h = {
        fontSize: "45px",
        color: "rgb(190, 29, 29)",
        marginBottom: "10px"
    }
    const p = {
        fontSize: "20px",
        color: "#000",
        marginTop: "10px"
    }
    return (
        <div style={notFound}>
            <h1 style={h}>page not found</h1>
            <p style={p}>404!! sorry router is not matching try again later</p>
        </div>
    );
};

export default NotFound;