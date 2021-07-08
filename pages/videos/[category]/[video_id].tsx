import cookies from "next-cookies";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Form, FormikHelpers } from "formik";
import FormikControl from "../../../components/forms/Formik/FormikControl";
import CommentSchema from "../../../schemas/comment.schema";
import { GetServerSideProps } from "next";
import Axios from "axios";
import YoutubePlayer from "../../../components/YoutubePlayer";

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
  token,
}): JSX.Element => {
  const configHeaderWithBearer = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const router = useRouter();
  const refreshPage = () => {
    router.replace(router.asPath);
  };
  useEffect(() => {
    if (data.error) {
      router.push("/404");
    }
  }, [data.error, router]);
  const { video, comments } = data;
  const initialValues = {
    video_id: data.video ? data.video.video_id : "",
    comment: "",
  };

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<any>) => {
    Axios.post(`/add-comment`, values, configHeaderWithBearer) // we are sending a post request to the API endpoint to add comment to database
      .then(() => {
        refreshPage(); // on success we want to make a quick refresh on the page to update the state
        formikHelpers.setSubmitting(false); // we stop submitting the form
        formikHelpers.resetForm(); // here we reset the form
      });
  };
  return (
    <>
      <div>
        {error ? (
          <div className="ta-center">
            <h1>Ooops...</h1>
            <h2>
              An Error Occurred. Check your internet connection and try again
              later :(
            </h2>
          </div>
        ) : (
          <>
            <div className="d-flex wrap">
              <div className="col-md-8 p-10 flex-0">
                <YoutubePlayer videoId={video.video_id} />
                <h3>{video.title}</h3>
                <p className="mb-10">{video.description}</p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={CommentSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form className="b-block p-10">
                        <FormikControl
                          control="textarea"
                          type="text"
                          label=""
                          name="comment"
                          options={[]}
                        />
                        <FormikControl
                          control="input"
                          type="hidden"
                          label=""
                          name="video_id"
                          options={[]}
                        />
                        <button
                          type="submit"
                          disabled={!formik.isValid || formik.isSubmitting}
                          className="btn btn-primary"
                        >
                          Add Comment
                        </button>
                        <div
                          className={formik.isSubmitting ? "d-block" : "d-none"}
                        >
                          Submitting...
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <div className="col-md-4 flex-0 p-10">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="bb-block my-10">
                      <h4>{comment.name}</h4>
                      <p className="mb-10">{comment.comment}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>No comments at the moment</p>
                  </div>
                )}
              </div>
            </div>
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
