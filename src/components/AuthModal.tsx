import { useEffect, useRef, useState } from "react";
import {
  X, Mail, Lock, User, Phone, Crown, ArrowRight, CheckCircle2, MailCheck, Sparkles, AlertCircle, RefreshCw, ShieldCheck,
} from "lucide-react";
import { useStore } from "../store/StoreContext";
import { GoldButton, GhostButton } from "./ui";

type Mode = "login" | "register" | "forgot";
type Method = "email" | "phone";
type OtpStep = "phone" | "otp";

const emptyForm = { name: "", email: "", phone: "", password: "" };
const DEMO_CODE = "123456";

export default function AuthModal() {
  const { authOpen, setAuthOpen, layouts, login, register, loginWithPhone } = useStore();
  const layout = layouts.auth;
  const [mode, setMode] = useState<Mode>("login");
  const [method, setMethod] = useState<Method>("email");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  // OTP
  const [otpStep, setOtpStep] = useState<OtpStep>("phone");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (otpStep !== "otp" || timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpStep, timer]);

  if (!authOpen) return null;

  const set = (k: keyof typeof form, v: string) => { setForm((f) => ({ ...f, [k]: v })); setError(null); };

  const close = () => {
    setAuthOpen(false);
    setTimeout(() => {
      setMode("login"); setMethod("email"); setForm(emptyForm); setError(null); setSuccess(null);
      setForgotSent(false); setOtpStep("phone"); setOtp(["", "", "", "", "", ""]); setTimer(0);
    }, 200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email.trim() || !form.password) { setError("ایمیل و رمز عبور را وارد کنید."); return; }
    const res = login(form.email, form.password);
    if (!res.ok) { setError(res.error ?? "خطا در ورود"); return; }
    setSuccess("با موفقیت وارد شدید ✦"); setTimeout(close, 1100);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password) { setError("لطفاً همه‌ی فیلدها را تکمیل کنید."); return; }
    if (form.password.length < 6) { setError("رمز عبور باید حداقل ۶ کاراکتر باشد."); return; }
    const res = register(form);
    if (!res.ok) { setError(res.error ?? "خطا در ثبت‌نام"); return; }
    setSuccess("حساب شما ساخته شد ✦"); setTimeout(close, 1100);
  };

  const sendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalized = toEnglishDigits(form.phone).replace(/\D/g, "");
    if (!/^09\d{9}$/.test(normalized)) { setError("شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)."); return; }
    setForm((f) => ({ ...f, phone: normalized }));
    setOtp(["", "", "", "", "", ""]); setOtpStep("otp"); setTimer(60);
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const onOtpChange = (i: number, v: string) => {
    const digit = toEnglishDigits(v).replace(/\D/g, "").slice(-1);
    setOtp((prev) => { const n = [...prev]; n[i] = digit; return n; });
    setError(null);
    if (digit && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const onOtpKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };
  const onOtpPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text) { e.preventDefault(); setOtp(text.padEnd(6, "").split("").slice(0, 6)); }
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = otp.join("");
    if (code.length < 6) { setError("کد ۶ رقمی را کامل وارد کنید."); return; }
    if (code !== DEMO_CODE) { setError("کد واردشده اشتباه است."); return; }
    loginWithPhone(form.phone);
    setSuccess("ورود با موبایل موفق بود ✦"); setTimeout(close, 1100);
  };

  const formBlock = (
    <>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-dark to-amber-glow shadow-lg shadow-amber-gold/20">
          <Crown size={26} className="text-onyx-black" />
        </div>
        <h3 className="text-lg font-black tracking-wide text-amber-glow">Aroma</h3>
        <p className="mt-1 text-xs text-zinc-400">به گالری عطر رایحه سلطنتی خوش آمدید</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-black/30 p-1">
        {(["login", "register"] as const).map((t) => (
          <button key={t} type="button" onClick={() => { setMode(t); setError(null); }}
            className={`rounded-full py-2.5 text-sm font-bold transition ${mode === t ? "bg-gradient-to-l from-amber-dark to-amber-gold text-onyx-black" : "text-zinc-400 hover:text-zinc-200"}`}>
            {t === "login" ? "ورود" : "ثبت‌نام"}
          </button>
        ))}
      </div>

      {success ? (
        <div className="grid place-items-center gap-3 py-8 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"><CheckCircle2 size={34} /></div>
          <p className="text-sm font-bold text-zinc-100">{success}</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-rose/30 bg-amber-rose/10 px-3.5 py-2.5 text-xs text-amber-rose"><AlertCircle size={15} className="shrink-0" /> {error}</div>
          )}

          {/* LOGIN */}
          {mode === "login" && (
            <>
              <div className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-black/20 p-1 text-xs">
                <button type="button" onClick={() => { setMethod("email"); setError(null); }} className={`rounded-full py-2 font-bold transition ${method === "email" ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-400"}`}>ایمیل</button>
                <button type="button" onClick={() => { setMethod("phone"); setError(null); setOtpStep("phone"); }} className={`rounded-full py-2 font-bold transition ${method === "phone" ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-400"}`}>موبایل (OTP)</button>
              </div>

              {method === "email" ? (
                <form onSubmit={handleLogin} className="space-y-3">
                  <Field icon={<Mail size={16} />} type="email" placeholder="ایمیل" dir="ltr" value={form.email} onChange={(e) => set("email", e.target.value)} />
                  <Field icon={<Lock size={16} />} type="password" placeholder="رمز عبور" dir="ltr" value={form.password} onChange={(e) => set("password", e.target.value)} />
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-zinc-400"><input type="checkbox" className="accent-amber-gold" /> مرا به خاطر بسپار</label>
                    <button type="button" onClick={() => { setMode("forgot"); setError(null); setForgotSent(false); }} className="font-semibold text-amber-gold hover:underline">فراموشی رمز؟</button>
                  </div>
                  <GoldButton type="submit" className="w-full">ورود به حساب</GoldButton>
                </form>
              ) : (
                /* PHONE OTP */
                otpStep === "phone" ? (
                  <form onSubmit={sendCode} className="space-y-3">
                    <Field icon={<Phone size={16} />} type="tel" placeholder="شماره موبایل (۰۹۱۲...)" dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    <GoldButton type="submit" className="w-full"><ShieldCheck size={16} /> ارسال کد تأیید</GoldButton>
                  </form>
                ) : (
                  <form onSubmit={verifyOtp} className="space-y-3">
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-center text-[11px] text-zinc-400">
                      کد ۶ رقمی به شماره <span className="font-bold text-amber-glow" dir="ltr">{form.phone}</span> ارسال شد
                      <button type="button" onClick={() => { setOtpStep("phone"); setTimer(0); }} className="mt-1 block w-full text-[10px] text-zinc-500 hover:text-amber-gold">تغییر شماره</button>
                    </div>
                    <div dir="ltr" className="flex justify-between gap-2" onPaste={onOtpPaste}>
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          ref={(el) => { otpRefs.current[i] = el; }}
                          inputMode="numeric"
                          maxLength={1}
                          value={d}
                          onChange={(e) => onOtpChange(i, e.target.value)}
                          onKeyDown={(e) => onOtpKey(i, e)}
                          className="h-14 w-full rounded-xl border border-white/10 bg-black/20 text-center text-lg font-black text-zinc-100 outline-none transition focus:border-amber-gold/60 focus:ring-4 focus:ring-amber-gold/15"
                        />
                      ))}
                    </div>
                    <GoldButton type="submit" className="w-full"><CheckCircle2 size={16} /> تأیید و ورود</GoldButton>
                    <div className="text-center text-[11px]">
                      {timer > 0 ? (
                        <span className="text-zinc-500">ارسال مجدد تا <span className="font-bold text-amber-gold">{tomanDigits(timer)}</span> ثانیه</span>
                      ) : (
                        <button type="button" onClick={() => { setOtp(["", "", "", "", "", ""]); setTimer(60); otpRefs.current[0]?.focus(); }} className="flex items-center justify-center gap-1 text-amber-gold hover:underline"><RefreshCw size={12} /> ارسال مجدد کد</button>
                      )}
                    </div>
                    <div className="rounded-lg border border-amber-gold/15 bg-amber-gold/5 px-3 py-1.5 text-center text-[10px] text-zinc-500">کد دمو برای تست: <span className="font-mono font-bold text-amber-gold" dir="ltr">۱۲۳۴۵۶</span></div>
                  </form>
                )
              )}
            </>
          )}

          {/* REGISTER */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-3">
              <Field icon={<User size={16} />} placeholder="نام و نام خانوادگی" value={form.name} onChange={(e) => set("name", e.target.value)} />
              <Field icon={<Mail size={16} />} type="email" placeholder="ایمیل" dir="ltr" value={form.email} onChange={(e) => set("email", e.target.value)} />
              <Field icon={<Phone size={16} />} type="tel" placeholder="شماره موبایل" dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              <Field icon={<Lock size={16} />} type="password" placeholder="رمز عبور" dir="ltr" value={form.password} onChange={(e) => set("password", e.target.value)} />
              <GoldButton type="submit" className="w-full">ایجاد حساب کاربری</GoldButton>
            </form>
          )}

          {mode === "login" && method === "email" && (
            <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-center text-[10px] leading-5 text-zinc-500">
              حساب دمو برای تست: <span className="font-mono text-amber-gold" dir="ltr">demo@aroma.ir</span> / <span className="font-mono text-amber-gold" dir="ltr">123456</span>
            </div>
          )}
          <p className="mt-4 text-center text-[11px] text-zinc-500">با ورود، قوانین و حریم خصوصی  آروما را می‌پذیرید.</p>
        </>
      )}
    </>
  );

  const inner = mode === "forgot" ? (
    <ForgotView sent={forgotSent} onSent={() => setForgotSent(true)} onBack={() => { setMode("login"); setForgotSent(false); }} />
  ) : formBlock;

  const CloseBtn = (
    <button onClick={close} className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-zinc-400 transition hover:text-amber-gold"><X size={18} /></button>
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={close} />

      {layout === "l2" ? (
        <div className="relative grid w-full max-w-4xl animate-fade-up overflow-hidden rounded-3xl border border-amber-gold/20 bg-onyx-dark shadow-2xl md:grid-cols-2">
          <div className="relative hidden md:block">
            <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-l from-onyx-black/90 to-onyx-black/40" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <div className="flex items-center gap-2"><span className="text-2xl">👑</span><div><div className="text-base font-black tracking-wider text-amber-glow">Aroma</div><div className="text-[9px] tracking-widest text-amber-gold/70">رایحه سلطنتی</div></div></div>
              <div>
                <h4 className="text-2xl font-black leading-tight text-zinc-100">امضای معطرِ <span className="amber-gradient-text">شما</span></h4>
                <p className="mt-2 text-xs leading-6 text-zinc-400">به کلوب مشتریان  آروما بپیوندید و از تخفیف‌های ویژه بهره‌مند شوید.</p>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-amber-gold"><Sparkles size={13} /> اصالت تضمینی · ارسال سریع</div>
              </div>
            </div>
          </div>
          <div className="relative p-6 sm:p-8">{inner}{CloseBtn}</div>
        </div>
      ) : layout === "l3" ? (
        <div className="relative w-full max-w-md animate-fade-up">
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/25 shadow-2xl">
            <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-onyx-black/65 backdrop-blur-sm" />
            <div className="relative p-6 sm:p-8">{inner}{CloseBtn}</div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-md animate-fade-up overflow-hidden rounded-3xl border border-amber-gold/20 bg-onyx-dark p-6 shadow-2xl sm:p-8">{inner}{CloseBtn}</div>
      )}
    </div>
  );
}

function tomanDigits(n: number) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
function toEnglishDigits(s: string) {
  return s.replace(/[۰-۹٠-٩]/g, (d) => {
    const fi = FA_DIGITS.indexOf(d);
    if (fi !== -1) return String(fi);
    const ai = AR_DIGITS.indexOf(d);
    return ai !== -1 ? String(ai) : d;
  });
}

function ForgotView({ sent, onSent, onBack }: { sent: boolean; onSent: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  return (
    <div>
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-xs font-semibold text-zinc-400 transition hover:text-amber-gold"><ArrowRight size={14} /> بازگشت به ورود</button>
      {sent ? (
        <div className="py-6 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"><MailCheck size={32} /></div>
          <h3 className="text-lg font-bold text-zinc-100">ایمیل بازنشانی ارسال شد</h3>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-400">لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی (و پوشه‌ی اسپم) را بررسی کنید.</p>
          <GoldButton className="mt-5 w-full" onClick={onBack}>بازگشت به ورود</GoldButton>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); onSent(); }}>
          <div className="mb-5 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-amber-gold/10 text-amber-gold"><Lock size={26} /></div>
            <h3 className="text-lg font-bold text-zinc-100">بازیابی رمز عبور</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-400">ایمیل خود را وارد کنید تا لینک بازنشانی رمز برایتان ارسال شود.</p>
          </div>
          <Field icon={<Mail size={16} />} type="email" placeholder="ایمیل ثبت‌شده" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} />
          <GoldButton type="submit" className="mt-3 w-full"><CheckCircle2 size={16} /> ارسال لینک بازیابی</GoldButton>
          <GhostButton className="mt-2 w-full" onClick={onBack}>انصراف</GhostButton>
        </form>
      )}
    </div>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex h-14 items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 transition duration-200 focus-within:border-amber-gold/60 focus-within:ring-4 focus-within:ring-amber-gold/15">
      {icon && <span className="text-amber-gold/70">{icon}</span>}
      <input {...props} required className="flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500" />
    </div>
  );
}
