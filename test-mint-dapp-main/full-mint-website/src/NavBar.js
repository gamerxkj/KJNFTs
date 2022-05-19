import React from "react";
import { Flex, Image, Link, Box } from '@chakra-ui/react'
import Facebook from "./assets/social-media-icons/facebook_32x32.png"
import Twitter from "./assets/social-media-icons/twitter_32x32.png"
import Email from "./assets/social-media-icons/email_32x32.png"

import UAuth from '@uauth/js'


const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            setAccounts(accounts);
        }
    }

    async function connectViaUDS() {

        console.log(window.location.href)

        try {
            
          const authorization = await uauth.loginWithPopup()
          console.log(authorization)

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
        scope: 'openid wallet email:optional',
    })
    

    return (
        <Flex justify="space-between" align="center" padding="30px 30px">
            {}
            <Flex justify="space-between" width="40%" padding="0 75px">
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
                width="40%"
                padding="30px">

                
                <div>
                    {isConnected ? (
                        <Box class="button-9">Connected</Box>
                    ) : (
                        <div >
                            <button class="button-9"  onClick={connectAccount}>Connect via MetaMask</button>
                            <button class="button-9"  onClick={connectViaUDS}>Connect via Unstoppable</button>
                        </div>
                    )}
                </div>
            </Flex>

        
        </Flex>
    )

}

export default NavBar;
