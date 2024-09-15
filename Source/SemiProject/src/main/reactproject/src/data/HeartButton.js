import React, { useState, useEffect } from "react";

import styled from "styled-components";
import HeartImg from "../assets/heart.png";
import EmptyHeartImg from "../assets/empty-heart.png";

const Heart = styled.img`
    // css
    }
`;

const HeartButton = ({ like, onClick }) => {
    return (
        <Heart src={like?HeartImg:EmptyHeartImg} onClick={onClick} />
    );
};

export default HeartButton;