const prisma = require("../config/prisma");

exports.createUser = ({email , passwordHash , organizationId}) => {
    return prisma.user.create({
        data:{
            email,passwordHash, organizationId
        },
    });
};


exports.findByEmail = async (email) => {
    return prisma.user.findUnique({
        where : {email},
    });
};