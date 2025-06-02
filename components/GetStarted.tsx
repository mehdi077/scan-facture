import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

function GetStarted() {
  return (
    <div>
        <SignedIn>
            <UserButton />
        </SignedIn>
        <SignedOut>
            <SignInButton mode="modal" />
        </SignedOut>
    </div>
  )
}

export default GetStarted