import React from 'react';
import { OAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import styled from 'styled-components';
import { firebaseAuth } from '$utils/firebase';

import microsoftIcon from '$assets/ms-symbollockup_mssymbol_19.svg';

const ButtonContainer = styled.div`
  display: flex;
  width: 225px;
  height: 42px;
  border: 0;
  padding: 0;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const IconContainer = styled.div`
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: white;
`;

const IconWrapper = styled.div`
  margin-top: 11px;
  margin-left: 11px;
  width: 18px;
  height: 18px;

  & img {
    height: 100%;
    width: 100%;
  }
`;

const SignInText = styled.div`
  margin: 11px 11px 0 10px;
  color: #5e5e5e;
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 600;
`;

export type SignInWithMicrosoftButtonProps = {
  onClick?: () => void;
  onSuccess?: (result: UserCredential) => void;
  onError?: (e: Error) => void;
};

export const SignInWithMicrosoftButton = React.forwardRef<
  HTMLDivElement,
  SignInWithMicrosoftButtonProps
>(({ onClick, onSuccess, onError }, ref) => {
  const handleSignInWithMicrosoft = async () => {
    onClick?.call(null);
    try {
      const provider = new OAuthProvider('microsoft.com');
      provider.setCustomParameters({
        prompt: 'consent',
      });
      const result = await signInWithPopup(firebaseAuth, provider);
      onSuccess?.call(null, result);
    } catch (error) {
      onError?.call(null, error);
    }
  };

  return (
    <ButtonContainer onClick={handleSignInWithMicrosoft} ref={ref}>
      <IconContainer>
        <IconWrapper>
          <img src={microsoftIcon} />
        </IconWrapper>
      </IconContainer>
      <SignInText>Sign in with Microsoft</SignInText>
    </ButtonContainer>
  );
});
