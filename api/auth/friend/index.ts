import express from 'express';
import { appDataSource } from '../../dbconfig';
import { Client } from '../../src/entities/Client';



const router = express.Router();


router.post('/add', async (req, res) => {
    const { clientId, futureFriendId } = req.body;

    console.log(clientId, futureFriendId);

    const futureFriend = await Client.findOneBy({
        id: futureFriendId
    });
    const user = await Client.findOneBy({
        id: clientId
    });


    console.log('futureFriend', futureFriend);
    console.log('me', user);
    const currentFriends = user!.friends;
    const updatedFriends = [...currentFriends, futureFriend];
    // if (user && newFriend) {
    //     loggedInUser = user;
    //     currentFriends = loggedInUser.friends ?? [];
    //     updatedFriends = [...currentFriends, newFriend];

    // }
    if (user !== null && futureFriend !== null) {
        await appDataSource
        .createQueryBuilder()
        .update(Client)
        .set({ friends: updatedFriends})
        .where(`id = ${clientId}`, { client: clientId })
        .execute();
    } else {
    return res.status(401).json({message: "Either the user or future friend does not exist."});

    }


    // const updatedFriends = [...currentFriends, newFriend]


    return res.status(201).json({message: "friend added"});

})

module.exports = router;





