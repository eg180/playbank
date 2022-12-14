import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledMemo } from '../styles/Memos.style';
import { StyledNavButton } from '../styles/NavButton.style';


const Memos = (props: {refreshMemos: () => void}) => {
    const { refreshMemos } = props;
    const [memos, setMemos] = useState([]);
    const [selectedMemos, setSelectedMemos] = useState<string[]>([]);
    const [showItems, setShowItems] = useState(false);

    const toggleShowItems = () => {
        setShowItems(!showItems);
    };

    const handleDeleteMemo = async () => {
        let token: string = JSON.parse(sessionStorage.getItem('sesh')) ?? 'notfound';
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
                const remainingMemos = await axios.delete(`http://localhost:5000/api/auth/memo`, { headers: header, data: selectedMemos });
                setMemos(remainingMemos.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const addToSelectedMemos = (e: { target: { id: string } }) => {
        if (!selectedMemos.includes(e.target.id)) {
            setSelectedMemos([...selectedMemos, e.target.id]);
        } else {
            const updatedIds = selectedMemos.filter((id) => id !== e.target.id);
            setSelectedMemos(updatedIds);
        }
        refreshMemos();
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
    }, [refreshMemos]);

    return (
        <StyledMemo>
            <span id="memo-count" onClick={toggleShowItems}>
                {' '}
                ⏰ {memos?.length}
            </span>
            {showItems && (
                <ul>
                    {memos.map((memo: any) => {
                        return (
                            <li key={memo.id}>
                                {memo.memo}
                                <span id="memo-amount"> ${memo.amount}</span>
                                <input type="checkbox" id={memo.id} onChange={addToSelectedMemos} />
                            </li>
                        );
                    })}
                    <StyledNavButton onClick={handleDeleteMemo}>Delete</StyledNavButton>
                </ul>
            )}
        </StyledMemo>
    );
};

export default Memos;
