import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const saveUserToDb = async (userId, accessToken, refreshToken, expiresIn) => {
    const params = {
        TableName: "User",
        Item: {
            spotifyId: userId,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresAt: Date.now() + expiresIn * 1000
        },
    };

    try {
        await dynamoDB.put(params).promise();
        //console.log(`User ${userId} saved successfully.`);
    } catch (err) {
        console.error('Error saving user:', err.message);
        throw new Error('Failed to save user data');
    }
}

export const fetchUserAccessToken = async (userId) => {
    const params = {
        TableName: "User",
        Key: {
            spotifyId: userId
        }
    };
    try {
        const result = await dynamoDB.get(params).promise();
        return result.Item.accessToken;
    } catch (error) {
        console.log(`Error fetching user access token from DB: ${error.message}`);
    }
}

export const fetchUserRefreshToken = async (userId) => {
    const params = {
        TableName: "User",
        Key: {
            spotifyId: userId
        }
    };
    try {
        const result = await dynamoDB.get(params).promise();
        return result.Item.refreshToken;
    } catch (error) {
        console.log(`Error fetching user refresh token from DB: ${error.message}`);
    }
}

export const updateUserDetails = async (spotifyId, accessToken, refreshToken = null, expiresIn) => {
    const params = {
        TableName: "User",
        Key: { spotifyId },
        UpdateExpression: "set accessToken = :at, expiresAt = :exp" + (refreshToken ? ", refreshToken = :rt" : ""),
        ExpressionAttributeValues: {
            ":at": accessToken,
            ":exp": Date.now() + expiresIn * 1000, // Store expiration timestamp
        },
        ReturnValues: "UPDATED_NEW",
    };

    if (refreshToken) {
        params.ExpressionAttributeValues[":rt"] = refreshToken;
    }

    try {
        await dynamoDB.update(params).promise();
        console.log(`Updated user ${spotifyId} with new tokens.`);
    } catch (error) {
        console.error(`Error updating user details: ${error.message}`);
        throw new Error("Failed to update user tokens.");
    }
};

export const fetchUserExpiresAt = async (userId) => {
    return (await dynamoDB.get({
        TableName: "User",
        Key: {spotifyId: userId}
    }).promise()).Item.expiresAt;
}
