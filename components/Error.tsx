interface AlertProps { 
    error: string
    type: string
}

const Alert: React.FunctionComponent<AlertProps> = ({error, type}):JSX.Element => {
    const alertType = type === "success" ? "alert-success" : "alert-danger";
    return (
        <div className={`alert ${alertType} ta_center`} id="alert">{error}</div>
    )
}

export default Alert;
