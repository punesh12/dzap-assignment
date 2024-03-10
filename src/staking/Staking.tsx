import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { STAKING_CONTRACT_ADDRESS } from '../config';
import { OutlineButton, StyledButton } from '../connectWallet/style';

import { Col, Container, Input, Row } from './style';
import { formatEther } from '../helpers';
import { stakingABI } from '../abis/abis';

const StakingComponent = () => {

    const { account } = useWeb3React();

    // State variables
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [stakerInfo, setStakerInfo] = useState(null);
    const [writeContract, setWriteContract] = useState(null);
    const [message, setMessage] = useState('');



    // useEffect to initialize provider and staking contract
    useEffect(() => {
        const initializeProvider = async () => {
            try {
                // Initialize provider
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();

                // Initialize staking contract
                const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, stakingABI, signer);
                setWriteContract(stakingContract);


            } catch (error) {
                console.error('Error initializing provider:', error);
            }
        };
        initializeProvider();
    }, []);

    // Function to fetch contract details
    const getContractDetails = async () => {
        try {
            if (!writeContract) return;
            const details = await writeContract.getDetails();
            return details;
        } catch (error) {
            console.error('Error fetching contract details:', error);
            return null;
        }
    };

    // Function to get staker info
    const getStakerInfo = async (stakerAddress: string) => {
        setLoading(true);
        try {
            if (!writeContract) return;
            //@ts-ignore
            const stakerInfo = await writeContract.getStakerInfo(stakerAddress);
            const details = await getContractDetails()

            // Calculate next claim time
            const lastClaimTime = Number(stakerInfo.claimCheckpoint);
            const claimDelay = Number(details.claimDelay);
            const currentTime = new Date()
            const nextClaimTime = lastClaimTime + (claimDelay);

            // Convert next claim time to time and date
            // const nextClaimDateTime = new Date(nextClaimTime * 1000).toLocaleString();
            const nextClaimDateTime = new Date(currentTime.getTime() + nextClaimTime);

            // Update stakerInfo with next claim time and additional details
            const updatedStakerInfo = {
                ...stakerInfo,
                nextClaimTime: nextClaimTime,
                nextClaimDateTime: nextClaimDateTime,
                isPaused: details.isPaused,
                resetClaimDelay: details.resetClaimDelay,
                claimDelay: details.claimDelay,
                totalRewards: details.totalRewards,
                totalFundsStaked: details.totalFundsStaked,
                totalRewardsDistributed: details.totalRewardsDistributed
            };

            setStakerInfo(updatedStakerInfo);
        } catch (error) {
            console.error('Error getting staker info:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        getStakerInfo(account || "")
    }, [writeContract, account])

    // Function to stake tokens
    const stakeTokens = async () => {
        setLoading(true);
        try {
            if (!writeContract || !amount) return;
            const valueInWei = ethers.utils.parseEther(amount);
            const tx = await writeContract.stake(valueInWei);
            await tx.wait();
            setMessage('Tokens staked successfully');
        } catch (error) {
            console.error('Error staking tokens:', error);
            setMessage('Error staking tokens');
        } finally {
            setLoading(false);
        }
    };

    // Function to unStake tokens
    const unStakeTokens = async () => {
        setLoading(true);
        try {
            if (!writeContract) return;
            const tx = await writeContract.unstake();
            await tx.wait();
            setMessage('Tokens unStaked successfully');
        } catch (error) {
            console.error('Error unStaking tokens:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to claim rewards
    const claimRewards = async () => {
        setLoading(true);
        try {
            if (!writeContract) return;
            const tx = await writeContract.claimRewards();
            await tx.wait();
            setMessage('Rewards claimed successfully');
        } catch (error) {
            console.error('Error claiming rewards:', error);
            setMessage('Error claiming rewards');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {message}
            <Container>
                <Col>
                    <Row>

                        <Col style={{ alignItems: "start" }}>
                            <h5>Total Rewards</h5>
                            <h3>{formatEther(stakerInfo?.totalRewards)}</h3>
                        </Col>
                        <Col style={{ alignItems: "start" }}>
                            <h5>Total Funds Staked</h5>
                            <h3>{formatEther(stakerInfo?.totalFundsStaked)}</h3>
                        </Col>
                    </Row>


                    <Row>

                        <Col style={{ alignItems: "start" }}>
                            <h5>Is Paused:</h5>
                            <h3>
                                {stakerInfo?.isPaused ? 'Yes' : 'No'}
                            </h3>
                        </Col>
                        <Col style={{ alignItems: "start" }}>
                            <h5>Reset Claim Delay</h5>
                            <h3>
                                {stakerInfo?.resetClaimDelay ? 'Yes' : 'No'}
                            </h3>
                        </Col>
                    </Row>

                </Col>


                <Col style={{ border: "1px solid #5A55F3", padding: "0.5rem 5px", gap: "10px", borderRadius: '4px' }} >
                    <Row style={{ justifyContent: "space-between" }}>

                        <h3>Your available liquidity</h3>
                        <h3>{formatEther(stakerInfo?.stakedAmount)}</h3>
                    </Row>
                    <Row style={{ marginTop: "10px", gap: "0.5rem" }}>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount to stake"
                            min={0}

                        />
                        <StyledButton onClick={stakeTokens} disabled={loading || !account||!stakerInfo?.isPaused}>Stake</StyledButton>

                    </Row>
                    <OutlineButton
                        className='full-width'
                        onClick={unStakeTokens} disabled={loading || Number(formatEther(stakerInfo?.stakedAmount)) <= 0}>Unstake</OutlineButton>

                </Col>

                <Col style={{ justifyContent: "space-between", marginTop: "1rem", border: "1px solid #5A55F3", padding: '1rem 5px', borderRadius: '4px' }} >
                    <Row>
                        <Col style={{ alignItems: "start" }}>
                            <h5>Total Rewards Distributed:</h5>
                            <h3>{formatEther(stakerInfo?.totalRewardsDistributed)}</h3>
                        </Col>
                        <Col style={{ alignItems: "start" }}>
                            <h5>Unclaimed Rewards:</h5>
                            <h3>{formatEther(stakerInfo?.unclaimedRewards)}</h3>
                        </Col>
                        <StyledButton onClick={claimRewards} disabled={loading || Number(formatEther(stakerInfo?.unclaimedRewards)) <= 0}>Claim Rewards</StyledButton>
                    </Row>

                </Col>
            </Container>
        </>
    );
};

// Export StakingComponent
export default StakingComponent;