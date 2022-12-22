import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import { StyledMemo } from '../styles/Memos.style';
import { StyledNavButton } from '../styles/NavButton.style';
import useGetJwtData from 'src/utilities/hooks/useGetJwtData';

const Memos = (props: { refreshMemos: () => void }) => {
    const { refreshMemos } = props;
    const [memos, setMemos] = useState([]);
    const [selectedMemos, setSelectedMemos] = useState<string[]>([]);
    const [showItems, setShowItems] = useState(false);
    const token = useGetJwtData();

    const toggleShowItems = () => {
        if (memos?.length === 0) {
            return setShowItems(false);
        }
        setShowItems(!showItems);
    };

    const handleDeleteMemo = async () => {
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
                const remainingMemos = await axios.delete(`${BASEURL}/auth/memo`, {
                    headers: header,
                    data: selectedMemos,
                });
                setMemos(remainingMemos.data);
            } catch (error) {
                console.log(error);
            }
        }
        refreshMemos();
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
            const sessionToken: string = sessionStorage.getItem('sesh') ?? 'notfound';
            const token: string = JSON.parse(sessionToken);
            if (token !== 'notfound') {
                const header = { Authorization: `${token}` };
                const res = await axios.get(`${BASEURL}/auth/memo`, { headers: header });
                setMemos(res.data.memos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMemos();
    }, [refreshMemos]);

    if (memos?.length > 0) {
        return (
            <StyledMemo>
                {memos?.length > 0 && (
                    <span id="memo-count" onClick={toggleShowItems}>
                        {' '}
                        ⏰ {memos?.length}
                    </span>
                )}
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
    }
    return null;
    
};

export default Memos;
