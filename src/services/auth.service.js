const userRepository = require("../repositories/user.repository");
const {hashPassword, comaprePassword} = require("../utils/password");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.registerUser = async({ email , password, organizationId }) => {
    if(!email || !password || !organizationId){
        throw new Error("email, password and organizationId are required");
    }

    const existingUser = await userRepository.findByEmail(email);
    if(existingUser){
        throw new Error(`User already exists with ${email}`);
    }

    const passwordHash = await bcrpyt.hash(password, 10);


    const user = await userRepository.createUser({
        email, 
        passwordHash,
        organizationId,
    });
    
    return user;
};


exports.loginUser = async ( { email , password }) =>  {
    if (!email || !password) {
        throw new Error("email and password are required");
    }

    const user = await userRepository.findByEmail(email);
    if(!user){
        throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    // const token = jwt.sign({
    //     userId: user.id,
    //     organizationId: user.organizationId,
    // },
    // process.env.JWT_SECRET,
    // {expiresIn : '1h'}
    // );

    return {
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
    };
};