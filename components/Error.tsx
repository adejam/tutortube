interface AlertProps { 
    error: string
    type: string
};

const Alert: React.FunctionComponent<AlertProps> = ({error, type}) => {
    const alertType = type === "success" ? "alert-success" : "alert-danger";
    return (
        <div className={`alert ${alertType} ta_center`} id="alert" />
    )
}

export default Alert;
