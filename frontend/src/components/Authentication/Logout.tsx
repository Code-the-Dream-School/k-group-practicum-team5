import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return <p>{t("logout.message")}</p>;
};

export default Logout;
