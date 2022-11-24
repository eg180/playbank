import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledMemo } from '../styles/Memos.style';

const Memos = () => {
    const [memos, setMemos] = useState([]);
    const [showItems, setShowItems] = useState(false);

    const toggleShowItems = () => {
        setShowItems(!showItems);
    };

    const getMemos = async () => {
        try {
            let token: string = JSON.parse(sessionStorage.getItem('sesh')) ?? 'notfound';
            if (token !== 'notfound') {
                const header = { Authorization: `${token}` };
                const res = await axios.get(`http://localhost:5000/api/auth/memo`, { headers: header });
                setMemos(res.data.memos);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getMemos();
    }, []);
    return (
        <StyledMemo>
            <span id="memo-count" onClick={toggleShowItems}> ⏰ {memos.length}</span>
            {showItems && (
                <ul>
                    {memos.map((memo: any) => {
                        return (
                            <li key={memo.id}>
                                {memo.memo}
                                <span id="memo-amount"> ${memo.amount}</span>
                                <input type="checkbox" />
                            </li>
                        );
                    })}
                </ul>
            )}
        </StyledMemo>
    );
};

export default Memos;
