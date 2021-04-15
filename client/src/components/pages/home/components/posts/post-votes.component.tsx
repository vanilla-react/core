import { useProviders } from '@/entrypoint/useProviders.hook';
import { IPost, Kudo, KudoType } from '@/types';
import { VStack, Text } from '@chakra-ui/react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';

export const PostVotesComponent: React.FC<{
  id: number;
  kudos: Kudo[];
  post: IPost;
}> = observer(({ id, kudos, post }) => {
  const { postService, kudoService, authService } = useProviders();

  function handleVote(type: KudoType) {
    if (!authService.isAuthenticated) return;

    const hasAlreadyVoted = postService.hasAlreadyVotedOnType(
      post,
      authService.user!.id,
      type,
    );

    if (hasAlreadyVoted) {
      kudoService.removeVote(id, authService.user!.id);
      return;
    }

    kudoService.vote(id, authService.user!.id, type);
  }

  const totalUpvotes = kudos.filter((k) => k.type !== KudoType.UPVOTE).length;
  const totalDownVotes = kudos.filter((k) => k.type !== KudoType.DOWNVOTE)
    .length;

  const votes = totalDownVotes - totalUpvotes;

  const userHasVoted = kudos.find((k) => k.userId === authService.user?.id);

  return (
    <VStack spacing={0} justifyContent="center" mr={4}>
      <GoArrowUp
        className={classNames(
          'vote',
          {
            'vote--active': userHasVoted?.type === KudoType.UPVOTE,
          },
          { 'vote--inactive': userHasVoted == null },
        )}
        onClick={() => handleVote(KudoType.UPVOTE)}
      />
      <Text fontWeight="bold">{votes}</Text>
      <GoArrowDown
        className={classNames(
          'vote',
          {
            'vote--active': userHasVoted?.type === KudoType.DOWNVOTE,
          },
          { 'vote--inactive': userHasVoted == null },
        )}
        onClick={() => handleVote(KudoType.DOWNVOTE)}
      />
    </VStack>
  );
});
