import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params }) => {
  const { type } = params;
  const { userId } = auth();
  const transformation = transformationTypes[type];
  console.log(transformation)
  if (!userId) redirect('/sign-in');

  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type}
          creditBalance={user.creditBalance}
          config={transformation.config}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;