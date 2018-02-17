import client from '../../../common/database/client';

export default async (obj: Object, options: { id: string }) => {
  try {
    const connection = await client();
    const userRepository = connection.getRepository('User');

    const result = await userRepository.findOneById(options.id);

    return result;
  } catch (error) {
    throw error;
  }
};
