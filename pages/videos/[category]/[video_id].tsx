import cookies from "next-cookies";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, FormikHelpers } from "formik";
import FormikControl from "../../../components/forms/Formik/FormikControl";
import CommentSchema from "../../../schemas/comment.schema";
import { GetServerSideProps } from 'next'
import Axios from "axios";

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
  token
}):JSX.Element => {

  const configHeaderWithBearer = { 
    headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
 };
  
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  useEffect(() => {
    if (data.error) {
      router.push("/404");
    }
  }, [data.error, router]);
  const { video, comments } = data;
  const initialValues = {
    video_id: data.video ? data.video.video_id : '',
    comment:  "",
  };

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<any>) => {
    Axios.post(`/add-comment`, values, configHeaderWithBearer)
      .then(() => {
        refreshData();
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
      })
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
                    <FormikControl
                      control="input"
                      type="hidden"
                      label="Video"
                      name="video_id"
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

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  let data = {};
  let error = "";
  const { token } = cookies(ctx);
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
      `https://tutortube-api.herokuapp.com/api/videos/${ctx.params.category}/${ctx.params.video_id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      },
    );
    data = await response.json();
  } catch (e) {
    error = e.toString();
  }
  return {
    props: { data, token, error },
  };
};
