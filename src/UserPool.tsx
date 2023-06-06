import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'ap-south-1_0iFVFeC4n',
    ClientId: '4vhqrvpe312084qr0lf5oedqeu',
    poolArea:"ap-south-1"
};

export default new CognitoUserPool(poolData);




//With is for password auth

//   UserPoolId: 'ap-south-1_luXS4Boxu',
//   ClientId: '7auitu83vrs2oqh7e7nmi7vgr1',