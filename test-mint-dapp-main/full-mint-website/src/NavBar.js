import React, { useState } from "react";
import { Flex, Image, Link, Box, Button } from '@chakra-ui/react'
import Facebook from "./assets/social-media-icons/facebook_32x32.png"
import Twitter from "./assets/social-media-icons/twitter_32x32.png"
import Email from "./assets/social-media-icons/email_32x32.png"
import UDLogo from "./assets/social-media-icons/udLogo.png"
import metaLogo from "./assets/social-media-icons/metamask.png"

// import {
//     chakra, useColorModeValue, HStack, Button,
//     useDisclosure, VStack, IconButton, CloseButton
//   } from "@chakra-ui/react";

import UAuth from '@uauth/js'


const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);
    const [sub, setSub] = useState();

    async function connectAccount() {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",

            })

            setAccounts(accounts);
            setSub(accounts[0]);
        }
    }

    async function connectViaUDS() {

        try {
          const authorization = await uauth.loginWithPopup()
          setSub(authorization.idToken.sub);
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })

            setAccounts(accounts);
        } catch (error) {
          console.error(error)
        }
    }

    const uauth = new UAuth({
        clientID: process.env.REACT_APP_CLIENT_ID,
        redirectUri: window.location.href,
    })


    

    return (
        <Flex justify="space-between" align="center" padding="10px 10px">
            {}
            <Flex justify="space-between" width="30%" padding="0 75px">
                <Link href="https://facebook.com">
                    <Image src={Facebook} boxSize="42px" margin="0 15px"/>
                </Link>

                <Link href="https://twitter.com">
                    <Image src={Twitter} boxSize="42px" margin="0 15px"/>
                </Link>

                <Link href="https://gmail.com">
                    <Image src={Email} boxSize="42px" margin="0 15px"/>
                </Link>

            </Flex>

            <Flex 
                justify="space-around"
                align="center"
                width="50%"
                padding="20px">

                <div>
                    {isConnected ? (
                        <Box>Connected as {sub}</Box>
                    ) : (
                        <div>
                        <Button color={'white'} leftIcon={<img src={UDLogo} height="65px" />}
                            backgroundColor={'#4b47ee'}
                            _hover={{bg: '#0b24b3'}}
                            _active={{bg: '#5361c7'}}
                            padding="15px"
                            borderRadius={'10px'}
                            width= {'98%'}
                            fontSize={'25px'}
                            onClick={connectViaUDS}
                            margin={'15px'}
                            width={"500px"}
                            height={'70px'}
                        >
                            Login with Unstoppable
                        </Button>

                        <Button color={'white'} leftIcon={<img src={metaLogo} height="45px" />}
                            backgroundColor={'#ff9133'}
                            _hover={{bg: '#c37426'}}
                            _active={{bg: '#f7923b'}}
                            padding="15px"
                            borderRadius={'10px'}
                            width= {'98%'}
                            fontSize={'25px'}
                            onClick={connectAccount}
                            margin={'15px'}
                            width={"500px"}
                            height={'70px'}
                        >
                            Login with MetaMask
                        </Button>
                        </div>
                        

                    )}
                </div>
            </Flex>

        
        </Flex>
    )

}

export default NavBar;
