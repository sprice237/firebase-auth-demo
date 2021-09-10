import React from 'react';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import styled from 'styled-components';
import { firebaseAuth } from '$utils/firebase';

const ButtonContainer = styled.div`
  display: flex;
  width: 190px;
  height: 42px;
  border: 0;
  padding: 0;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const GoogleIconContainer = styled.div`
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: white;
`;

const GoogleIconWrapper = styled.div`
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
  color: #757575;
  font-size: 14px;
  letter-spacing: 0.2px;
  font-family: 'Roboto';
  font-weight: 500;
`;

export type SignInWithGoogleButtonProps = {
  onClick?: () => void;
  onSuccess?: (result: UserCredential) => void;
  onError?: (e: Error) => void;
};

export const SignInWithGoogleButton = React.forwardRef<HTMLDivElement, SignInWithGoogleButtonProps>(
  ({ onClick, onSuccess, onError }, ref) => {
    const handleSignInWithGoogle = async () => {
      onClick?.call(null);
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(firebaseAuth, provider);
        onSuccess?.call(null, result);
      } catch (error) {
        onError?.call(null, error);
      }
    };

    return (
      <ButtonContainer onClick={handleSignInWithGoogle} ref={ref}>
        <GoogleIconContainer>
          <GoogleIconWrapper>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
          </GoogleIconWrapper>
        </GoogleIconContainer>
        <SignInText>Sign in with Google</SignInText>
      </ButtonContainer>
    );
  }
);
