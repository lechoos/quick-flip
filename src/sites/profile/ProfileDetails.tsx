'use client';

import { User } from 'next-auth';
import { useState } from 'react';
import { UpdateProfileForm } from '@/components/forms/UpdateProfileForm';
import { Button } from '@/components/atoms/button';
import { Alert } from '@/components/ui/Alert';

type Props = {
  userDetails: { id: string; username: string } & User;
};

export const ProfileDetails = ({ userDetails }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const clickHandler = () => setShowForm(true);

  return (
    <>
      {isUpdated && (
        <Alert
          message="Profile updated successfully"
          variant="success"
          duration={5000}
        />
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-base sm:text-lg">Username: {userDetails?.username}</h3>
        <h3 className="mb-1 text-base sm:text-lg">Email: {userDetails?.email}</h3>
        {showForm ? (
          <UpdateProfileForm
            setShowForm={setShowForm}
            setIsUpdated={setIsUpdated}
          />
        ) : (
          <Button
            onClick={clickHandler}
            variant="secondary"
          >
            Edit your profile
          </Button>
        )}
      </div>
    </>
  );
};
