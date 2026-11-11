import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../Context/ShopContext";

export default function StockRestockNotice() {
  const { user } = useContext(CartContext);
  useEffect(() => {
    if (!user?.id) return;
    let active = true;
    const checkAlerts = () => fetch(`http://127.0.0.1:5000/api/stock-alerts/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (!active || !data.success) return;
        const seenKey = `mittal-restock-alerts-${user.id}`;
        const seen = new Set(JSON.parse(localStorage.getItem(seenKey) || "[]"));
        const newSeen = [...seen];
        (data.alerts || []).forEach((alert) => {
          if (!seen.has(alert.id)) { toast.success(`${alert.product_name} is back in stock!`); newSeen.push(alert.id); }
        });
        localStorage.setItem(seenKey, JSON.stringify(newSeen));
      })
      .catch(() => {});
    checkAlerts();
    const timer = window.setInterval(checkAlerts, 30000);
    return () => { active = false; window.clearInterval(timer); };
  }, [user?.id]);
  return null;
}
