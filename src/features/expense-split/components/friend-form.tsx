import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";

import { friendSchema, type FriendForm } from "../schema";

interface FriendFormProps {
  readonly friends: string[];
  readonly onAddFriend: (name: string) => void;
}

export default function FriendForm({
  friends,
  onAddFriend,
}: FriendFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FriendForm>({
    resolver: yupResolver(friendSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: FriendForm) => {
    const exists = friends.some(
      (friend) =>
        friend.toLowerCase() === data.name.trim().toLowerCase()
    );

    if (exists) {
      setError("name", {
        type: "manual",
        message: "Friend already exists",
      });

      return;
    }

    onAddFriend(data.name.trim());

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-end gap-4"
    >
      <div className="flex-1">
        <Input
          label="Friend Name"
          placeholder="Enter friend name"
          {...register("name")}
          error={errors.name?.message}
        />
      </div>

      <Button type="submit">
        Add
      </Button>
    </form>
  );
}