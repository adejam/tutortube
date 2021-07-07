import cookies from "next-cookies";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import FormikControl from "../../../components/forms/Formik/FormikControl";
import CommentSchema from "../../../schemas/comment.schema";
import { GetServerSideProps } from 'next'

interface Data {
  video: Video;
  comments: Array<Comment>;
  error: string;
}

interface Comment { 
  comment: string;
  id: string;
  name: string;
}

interface Values {
  comment: string;
}

export interface singleVideoProps {
  data: Data;
  token: string;
  error: string;
}

type Video = {
  video_id: string;
  url: string;
  category: string;
  description: string;
  title: string;
};

const SingleVideo: React.FunctionComponent<singleVideoProps> = ({
  data,
  error,
}):JSX.Element => {
  
  const router = useRouter();
  useEffect(() => {
    if (data.error) {
      router.push("/404");
    }
  }, [data.error, router]);
  const { video, comments } = data;
  const initialValues = {
    comment:  "",
  };

  const onSubmit = (values: Values) => {
    console.log(values);
  }
  return (
    <>
      <div className="ta-center">
        {error ? (
          <>
            <h1>Ooops...</h1>
            <h2>
              An Error Occurred. Check your internet connection and try again
              later :(
            </h2>
          </>
        ) : (
          <>
            <h1>{video.title}</h1>
            <p>{video.description}</p>
            {comments.length > 0 ? comments.map(comment => (
          <div key={comment.id} className="bt-block mt-10">
          <p>{comment.name}</p>
          <p>{comment.comment}</p>
          </div>
        
      )) : (
            <div>
              <p>No comments at the moment</p>
            </div>
            )
            }
            <Formik
              initialValues={initialValues}
              validationSchema={CommentSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="textarea"
                      type="text"
                      label="Add Comment"
                      name="comment"
                      options={[]}
                    />
                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Submit
                    </button>
                    <div className={formik.isSubmitting ? 'd-block' : 'd-none'}>Submitting...</div>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </div>
    </>
  );
};

export default SingleVideo;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let data = {};
  let error = "";
  const { token, } = cookies(context);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  try {
    const response = await fetch(
      `https://tutortube-api.herokuapp.com/api/videos/${context.params.category}/${context.params.video_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    data = await response.json();
  } catch (e) {
    error = e.toString();
  }
  return {
    props: { data, token, error },
  };
};
