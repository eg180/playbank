import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASEURL from '../utilities/BASEURL';
import {StyledIOUNotifcation } from '../styles/IOUNotifications.style';
import { StyledNavButton } from '../styles/NavButton.style';
import useGetJwtData from 'src/utilities/hooks/useGetJwtData';

const IOUNotifications = (props: { refreshIous: () => void }) => {
    const { refreshIous } = props;
    const [iouRequests, setIouRequests] = useState([]);
    const [selectedIouRequests, setSelectedIouRequests] = useState<string[]>([]);
    const [showRequests, setShowRequests] = useState(false);
    const token = useGetJwtData();

    enum IOUApproveBoolean {
        true = 'TRUE',
        false = 'FALSE'
    }

    interface IOURequest {
        accepted_by_receiver: boolean;
        additional_info: string | null;
        amount: string;
        client_id: number | null;
        created_at: Date;
        due_date: Date;
        paid: boolean;
        receiver_first_name: string;
        receiver_user_id: number;
        reminder_date: Date;
        sender_user_id: number;
        transaction_id: number;
        type: string;
        updated_at: Date;
    }

    const toggleShowItems = () => {
        if (iouRequests?.length === 0) {
            return setShowRequests(false);
        }
        setShowRequests(!showRequests);
    };

    const handleDisapproveIOU = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
                await axios.put(`${BASEURL}/auth/client/transaction/unapproved`, {
                    headers: header,
                    data: [selectedIouRequests, IOUApproveBoolean.false],
                });
                getIouRequest();
            } catch (error) {
                console.log(error);
            }
        }
        refreshIous();
    };

    const handleApproveIOU = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (token !== 'notfound') {
            const header = { Authorization: `${token}` };
            try {
                await axios.put(`${BASEURL}/auth/client/transaction/unapproved`, {
                    headers: header,
                    data: [selectedIouRequests, IOUApproveBoolean.true],
                });
                getIouRequest();
            } catch (error) {
                console.log(error);
            }
        }
        refreshIous();
    };

    const addToSelectedIOURequests = (e: { target: { id: string } }) => {
        if (!selectedIouRequests.includes(e.target.id)) {
            setSelectedIouRequests([...selectedIouRequests, e.target.id]);
        } else {
            const updatedIds = selectedIouRequests.filter((id) => id !== e.target.id);
            setSelectedIouRequests(updatedIds);
        }
    };

    const getIouRequest = async () => {
        try {
            const sessionToken: string = sessionStorage.getItem('sesh') ?? 'notfound';
            const token: string = JSON.parse(sessionToken);
            if (token !== 'notfound') {
                const header = { Authorization: `${token}` };
                const res = await axios.get(`${BASEURL}/auth/client/transaction/unapproved`, { headers: header });
                console.log(res.data);
                setIouRequests(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log('in getioureq use eff')
        getIouRequest();
    }, []);

    if (iouRequests?.length > 0) {
        return (
            <StyledIOUNotifcation>
                <span id="iou-count" onClick={toggleShowItems}>
                    {' '}
                    🚨 {iouRequests?.length} IOU Offers
                </span>

                {iouRequests && showRequests && (
                    <ul>
                        {iouRequests?.map((iouRequest: IOURequest) => {
                            return (
                                <li key={iouRequest.transaction_id}> 
                                    <span id="iou-amount"> User id:
                                    {iouRequest.sender_user_id} wants to send an IOU of ${iouRequest.amount}</span>
                                    <input type="checkbox" id={iouRequest.transaction_id?.toString()} onChange={addToSelectedIOURequests} />
                                </li>
                            );
                        })}
                        <StyledNavButton bgColor="#6d597a" onClick={handleDisapproveIOU}>Reject</StyledNavButton>
                        <StyledNavButton onClick={handleApproveIOU}>Accept</StyledNavButton>

                    </ul>
                )}
            </StyledIOUNotifcation>
        );
    }
    return null;
};

export default IOUNotifications;
