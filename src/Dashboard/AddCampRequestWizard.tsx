
// // src/pages/Dashboard/AddCampRequestWizard.tsx
// import React, { useMemo, useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
// import { Progress } from "../components/ui/progress";
// import { Plus, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { api } from "../lib/api";

// type BedsMap = Record<string, number>;
// type Option = { key: string; label: string };

// // ثوابت عربية بالكامل
// const BED_TYPES = [
//   { key: "king", label: "سرير كينج" },
//   { key: "queen", label: "سرير كوين" },
//   { key: "double", label: "سرير مزدوج" },
//   { key: "twin", label: "سرير توين" },
//   { key: "bunk", label: "سرير طابقين" },
//   { key: "sofa", label: "أريكة" },
//   { key: "crib", label: "سرير أطفال" },
//   { key: "air", label: "سرير هوائي" },
// ] as const;

// const COUNTRIES = ["Oman", "UAE", "KSA", "Qatar", "Kuwait", "Bahrain", "Jordan", "Egypt", "Morocco", "Tunisia", "Lebanon"] as const;

// const ACCOMMODATION_TYPES = [
//   { key: "Domes", label: "قبب" },
//   { key: "Tents", label: "خيام" },
//   { key: "Cabins", label: "أكواخ" },
//   { key: "Chalets", label: "شاليهات" },
//   { key: "A-Frame", label: "A-Frame" },
//   { key: "Yurts", label: "يورَت" },
//   { key: "Treehouse", label: "بيت شجري" },
// ] as const;

// const FACILITIES = [
//   { key: "kitchen", label: "مطبخ" },
//   { key: "lounge", label: "صالة" },
//   { key: "jacuzzi", label: "جاكوزي" },
//   { key: "indoorpool", label: "مسبح داخلي" },
//   { key: "outdoorpool", label: "مسبح خارجي" },
//   { key: "gym", label: "نادي رياضي" },
//   { key: "wheelchair", label: "وصول كراسي" },
//   { key: "wheelchairbath", label: "حمّام للكراسي" },
//   { key: "elevator", label: "مصعد" },
//   { key: "bathroom", label: "حمّام" },
//   { key: "halfbath", label: "حمّام خدمة" },
// ] as const;

// const BASIC_AMENITIES = [
//   { key: "electricity", label: "كهرباء" },
//   { key: "water", label: "ماء" },
//   { key: "hotwater", label: "ماء ساخن" },
//   { key: "wifi", label: "واي فاي" },
//   { key: "heating", label: "تدفئة" },
//   { key: "ac", label: "تكييف" },
//   { key: "linens", label: "مفروشات" },
//   { key: "washer", label: "غسالة" },
//   { key: "hairdryer", label: "مجفف شعر" },
//   { key: "parking", label: "موقف سيارات" },
//   { key: "fireplace", label: "مدفأة" },
//   { key: "eblankets", label: "بطاطين كهربائية" },
// ] as const;

// const BATH_AMENITIES = [
//   { key: "shower", label: "دش" },
//   { key: "bathtub", label: "بانيو" },
//   { key: "toilet", label: "مرحاض" },
//   { key: "sink", label: "حوض" },
//   { key: "towels", label: "مناشف" },
//   { key: "toiletries", label: "مستلزمات" },
//   { key: "tissue", label: "مناديل" },
// ] as const;

// const KITCHEN_AMENITIES = [
//   { key: "basics", label: "أدوات أساسية" },
//   { key: "fridge", label: "ثلاجة" },
//   { key: "microwave", label: "ميكروويف" },
//   { key: "kettle", label: "غلاية" },
//   { key: "coffee", label: "قهوة" },
//   { key: "oven", label: "فرن" },
//   { key: "stove", label: "موقد" },
// ] as const;

// const OUTDOOR_AMENITIES = [
//   { key: "bbq", label: "شواء" },
//   { key: "patio", label: "جلسة خارجية" },
//   { key: "furniture", label: "أثاث خارجي" },
//   { key: "garden", label: "حديقة" },
// ] as const;

// const SHARED_SPACES = [
//   { key: "outdoorpool", label: "مسبح خارجي مشترك" },
//   { key: "indoorpool", label: "مسبح داخلي مشترك" },
//   { key: "kitchen", label: "مطبخ مشترك" },
//   { key: "bathroom", label: "حمّام مشترك" },
//   { key: "lounge", label: "صالة مشتركة" },
// ] as const;

// const SECLUSION = [
//   { key: "multionproperty", label: "أكثر من وحدة بالموقع" },
//   { key: "residential", label: "منطقة سكنية" },
//   { key: "neartown", label: "قرب مدينة" },
//   { key: "nearroad", label: "قرب طريق" },
//   { key: "peoplelive", label: "يوجد سكان قريبون" },
// ] as const;

// const ACTIVITIES = [
//   { key: "swimming", label: "سباحة" },
//   { key: "horse", label: "ركوب خيل" },
//   { key: "fishing", label: "صيد" },
//   { key: "boating", label: "قوارب" },
//   { key: "wildlife", label: "حياة برية" },
//   { key: "hiking", label: "مشاة/هايكنج" },
//   { key: "winter", label: "أنشطة شتوية" },
//   { key: "watersport", label: "رياضات مائية" },
//   { key: "biking", label: "دراجات" },
//   { key: "kayak", label: "كاياك" },
//   { key: "climb", label: "تسلق" },
// ] as const;

// const TERRAINS = [
//   { key: "beach", label: "شاطئ" },
//   { key: "coastal", label: "ساحلي" },
//   { key: "desert", label: "صحراء" },
//   { key: "mountain", label: "جبل" },
//   { key: "forest", label: "غابة" },
//   { key: "lake", label: "بحيرة" },
//   { key: "plain", label: "سهل" },
//   { key: "river", label: "نهر" },
//   { key: "wetland", label: "أراضٍ رطبة" },
//   { key: "hotspring", label: "ينابيع حارة" },
//   { key: "waterfall", label: "شلال" },
// ] as const;

// const RULES = [
//   { key: "infants", label: "مسموح رُضّع" },
//   { key: "children", label: "مسموح أطفال" },
//   { key: "smoking", label: "مسموح تدخين" },
//   { key: "parties", label: "مسموح حفلات" },
//   { key: "events", label: "مسموح فعاليات" },
//   { key: "openfires", label: "مسموح نار مكشوفة" },
//   { key: "pets", label: "مسموح حيوانات" },
// ] as const;

// const BOOKING_METHODS = [
//   { key: "instant", label: "حجز فوري" },
//   { key: "request", label: "طلب حجز" },
// ] as const;

// // الحالة
// type WizardData = {
//   basics: { propertyType?: string; name: string; website?: string };
//   location: { country?: string; state?: string; city?: string; zip?: string; street?: string };
//   description: { summary?: string; guestServices?: string };
//   capacity: { maxGuests: number; bedrooms: number; beds: BedsMap };
//   facilities: { facilities: string[] };
//   amenities: { basic: string[]; bath: string[]; kitchen: string[]; outdoor: string[] };
//   sharedSpaces: string[];
//   seclusion: { options: string[]; note?: string };
//   activities: { options: string[]; note?: string };
//   terrain: { options: string[]; surroundings?: string };
//   photos: { files: File[]; titles: string[] };
//   rules: { allowed: string[]; minAge?: number; checkInFrom?: string; checkInTo?: string; checkOut?: string };
//   booking: { method: string; advanceNoticeDays?: number; bookingWindowMonths?: number; syncCalendars?: boolean; calendarProvider?: string };
//   pricing: { minNights?: number; nightly?: number; weeklyDiscountPct?: number };
//   policy: { cancellation?: string; refundableUntilDays?: number; refundPercent?: number; damageDeposit?: number; insuranceNotes?: string };
// };

// const initialData: WizardData = {
//   basics: { propertyType: ACCOMMODATION_TYPES[0].key, name: "", website: "" },
//   location: { country: "Oman", state: "", city: "", zip: "", street: "" },
//   description: { summary: "", guestServices: "" },
//   capacity: { maxGuests: 2, bedrooms: 1, beds: BED_TYPES.reduce((a, b) => ({ ...a, [b.key]: 0 }), {} as BedsMap) },
//   facilities: { facilities: [] },
//   amenities: { basic: [], bath: [], kitchen: [], outdoor: [] },
//   sharedSpaces: [],
//   seclusion: { options: [], note: "" },
//   activities: { options: [], note: "" },
//   terrain: { options: [], surroundings: "" },
//   photos: { files: [], titles: [] },
//   rules: { allowed: [], minAge: 18, checkInFrom: "", checkInTo: "", checkOut: "" },
//   booking: { method: "request", advanceNoticeDays: 0, bookingWindowMonths: 12, syncCalendars: false, calendarProvider: "" },
//   pricing: { minNights: 1, nightly: 100, weeklyDiscountPct: 0 },
//   policy: { cancellation: "Flexible", refundableUntilDays: 1, refundPercent: 100, damageDeposit: 0, insuranceNotes: "" },
// };

// // ترتيب الخطوات — أضفنا المرافق والخطوة الجديدة للسياسات
// const STEPS = [
//   { key: "p2", label: "الأساسيات" },
//   { key: "p3", label: "الموقع" },
//   { key: "p5", label: "الوصف" },
//   { key: "p6", label: "السعة والأسِرّة" },
//   { key: "p8", label: "الصور" },
//   { key: "p9f", label: "المرافق" },
//   { key: "p9", label: "المزايا" },
//   { key: "p10", label: "المساحات المشتركة" },
//   { key: "p11", label: "درجة العزلة" },
//   { key: "p12", label: "الأنشطة" },
//   { key: "p13", label: "التضاريس" },
//   { key: "p16", label: "القواعد" },
//   { key: "p17", label: "الحجز" },
//   { key: "p18", label: "الأسعار" },
//   { key: "p18p", label: "الإلغاء والتأمين" },
//   { key: "p19", label: "مراجعة وإرسال" },
// ] as const;

// // بطاقة
// function SectionCard(props: { title: string; children: React.ReactNode; subtitle?: string }): JSX.Element {
//   const { title, children, subtitle } = props;
//   return (
//     <div className="rounded-2xl border border-border bg-card text-card-foreground shadow p-5">
//       <div className="mb-3">
//         <h3 className="text-lg font-semibold">{title}</h3>
//         {subtitle ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p> : null}
//       </div>
//       <div>{children}</div>
//     </div>
//   );
// }

// // اختيارات متعددة
// function ChipMulti({
//   options,
//   value,
//   onChange,
// }: {
//   options: ReadonlyArray<Option>;
//   value: ReadonlyArray<string>;
//   onChange: (v: string[]) => void;
// }): JSX.Element {
//   const toggle = (k: string) => {
//     const s = new Set(value);
//     s.has(k) ? s.delete(k) : s.add(k);
//     onChange(Array.from(s));
//   };
//   return (
//     <div className="flex flex-wrap gap-2">
//       {options.map((o) => (
//         <button
//           key={o.key}
//           type="button"
//           onClick={() => toggle(o.key)}
//           className={`px-3 py-1 rounded-full border text-sm transition-colors ${
//             value.includes(o.key)
//               ? "bg-primary text-primary-foreground border-primary"
//               : "bg-secondary text-foreground border-border"
//           }`}
//         >
//           {o.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// function Counter({
//   value,
//   min = 0,
//   max = 99,
//   onChange,
// }: {
//   value: number;
//   min?: number;
//   max?: number;
//   onChange: (v: number) => void;
// }): JSX.Element {
//   return (
//     <div className="inline-flex items-center gap-2">
//       <Button type="button" variant="outline" onClick={() => onChange(Math.max(min, value - 1))}>-</Button>
//       <span className="w-10 text-center">{value}</span>
//       <Button type="button" variant="outline" onClick={() => onChange(Math.min(max, value + 1))}>+</Button>
//     </div>
//   );
// }

// function TagInput({
//   value,
//   onChange,
//   placeholder,
// }: {
//   value: string[];
//   onChange: (v: string[]) => void;
//   placeholder?: string;
// }): JSX.Element {
//   const [text, setText] = useState<string>(value.join(","));
//   const commit = (raw: string) => {
//     const arr = raw.split(/[,\s]+/).map((x) => x.trim()).filter(Boolean);
//     onChange(arr);
//   };
//   return (
//     <Input value={text} onChange={(e) => { setText(e.target.value); commit(e.target.value); }} placeholder={placeholder} />
//   );
// }

// export default function AddCampRequestWizard(): JSX.Element {
//   const [open, setOpen] = useState<boolean>(false);
//   const [data, setData] = useState<WizardData>(initialData);
//   const [step, setStep] = useState<number>(0);
//   const [submitting, setSubmitting] = useState<boolean>(false);

//   const progress = useMemo<number>(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

//   const update = (path: ReadonlyArray<string | number>, value: any) => {
//     setData((prev) => {
//       const clone: any = structuredClone(prev);
//       let ref = clone;
//       for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
//       ref[path[path.length - 1]] = value;
//       return clone;
//     });
//   };

//   const validateStep = (i: number): boolean => {
//     const k = STEPS[i].key;
//     if (k === "p2" && (!data.basics.name.trim() || data.basics.name.trim().length < 3)) { toast.error("أدخل اسم المخيم (3 أحرف على الأقل)"); return false; }
//     if (k === "p3" && (!data.location.state?.trim() || !data.location.city?.trim() || !data.location.street?.trim())) { toast.error("أكمل بيانات العنوان"); return false; }
//     if (k === "p6") {
//       const totalBeds = Object.values(data.capacity.beds).reduce((s, v) => s + Number(v || 0), 0);
//       if (data.capacity.maxGuests < 1 || data.capacity.bedrooms < 0 || totalBeds < 1) { toast.error("حدّد السعة والغرف ومجموعة الأسرة"); return false; }
//     }
//     if (k === "p8" && (!data.photos.files || data.photos.files.length < 1)) { toast.error("ارفع صورة واحدة على الأقل"); return false; }
//     if (k === "p18" && (!Number(data.pricing.minNights) || !Number(data.pricing.nightly))) { toast.error("أدخل الحد الأدنى وسعر الليلة"); return false; }
//     if (k === "p18p" && (Number(data.policy?.damageDeposit ?? 0) < 0)) { toast.error("قيمة التأمين لا يمكن أن تكون سالبة"); return false; }
//     return true;
//   };

//   const goNext = () => { if (!validateStep(step)) return; setStep((s) => Math.min(STEPS.length - 1, s + 1)); };
//   const goBack = () => setStep((s) => Math.max(0, s - 1));

//   const buildJoinJson = (): string =>
//     JSON.stringify({
//       basics: { propertyType: data.basics.propertyType, name: data.basics.name, website: data.basics.website },
//       location: { country: data.location.country, state: data.location.state, city: data.location.city, zip: data.location.zip, street: data.location.street },
//       description: { summary: data.description.summary, guestServices: data.description.guestServices },
//       capacity: { maxGuests: Number(data.capacity.maxGuests), bedrooms: Number(data.capacity.bedrooms), beds: data.capacity.beds },
//       facilities: { facilities: data.facilities.facilities },
//       amenities: { basic: data.amenities.basic, bath: data.amenities.bath, kitchen: data.amenities.kitchen, outdoor: data.amenities.outdoor },
//       sharedSpaces: data.sharedSpaces,
//       seclusion: { options: data.seclusion.options, note: data.seclusion.note },
//       activities: { options: data.activities.options, note: data.activities.note },
//       terrain: { options: data.terrain.options, surroundings: data.terrain.surroundings },
//       rules: { allowed: data.rules.allowed, minAge: Number(data.rules.minAge ?? 0), checkInFrom: data.rules.checkInFrom, checkInTo: data.rules.checkInTo, checkOut: data.rules.checkOut },
//       booking: { method: data.booking.method, advanceNoticeDays: Number(data.booking.advanceNoticeDays ?? 0), bookingWindowMonths: Number(data.booking.bookingWindowMonths ?? 0) },
//       pricing: { minNights: Number(data.pricing.minNights ?? 1), nightly: Number(data.pricing.nightly ?? 0), weeklyDiscountPct: Number(data.pricing.weeklyDiscountPct ?? 0) },
//       policy: { cancellation: data.policy.cancellation, refundableUntilDays: Number(data.policy.refundableUntilDays ?? 0), refundPercent: Number(data.policy.refundPercent ?? 0), damageDeposit: Number(data.policy.damageDeposit ?? 0), insuranceNotes: data.policy.insuranceNotes },
//     });

//   const submit = async () => {
//     if (!validateStep(step)) return;
//     setSubmitting(true);
//     try {
//       const form = new FormData();
//       (data.photos.files || []).forEach((f) => form.append("images", f));
//       form.append("joinDataJson", buildJoinJson());
//       await api.post("/api/camp-requests", form, { headers: { "Content-Type": "multipart/form-data" } });
//       toast.success("تم إرسال طلب الانضمام بنجاح");
//       setOpen(false); setData(initialData); setStep(0);
//     } catch (e: any) {
//       toast.error(e?.response?.data?.message || "تعذر إرسال الطلب.");
//     } finally { setSubmitting(false); }
//   };

//   const StepHeader = (): JSX.Element => (
//     <div className="mb-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-bold">{STEPS[step].label}</h2>
//         <span className="text-sm text-muted-foreground">{step + 1} / {STEPS.length}</span>
//       </div>
//       <div className="mt-3"><Progress value={progress} className="h-2 bg-secondary" /></div>
//     </div>
//   );

//   const FacilitiesBlock = (): JSX.Element => (
//     <SectionCard title="المرافق" subtitle="اختر المرافق المتوفرة في المكان">
//       <ChipMulti options={FACILITIES} value={data.facilities.facilities} onChange={(v) => update(["facilities", "facilities"], v)} />
//     </SectionCard>
//   );

//   const AmenitiesBlock = (): JSX.Element => (
//     <SectionCard title="المزايا" subtitle="أساسية / حمّام / مطبخ / خارجية">
//       <div className="grid md:grid-cols-2 gap-4">
//         <div><div className="text-sm mb-1">أساسية</div><ChipMulti options={BASIC_AMENITIES} value={data.amenities.basic} onChange={(v) => update(["amenities", "basic"], v)} /></div>
//         <div><div className="text-sm mb-1">الحمّام</div><ChipMulti options={BATH_AMENITIES} value={data.amenities.bath} onChange={(v) => update(["amenities", "bath"], v)} /></div>
//         <div><div className="text-sm mb-1">المطبخ</div><ChipMulti options={KITCHEN_AMENITIES} value={data.amenities.kitchen} onChange={(v) => update(["amenities", "kitchen"], v)} /></div>
//         <div><div className="text-sm mb-1">الخارجية</div><ChipMulti options={OUTDOOR_AMENITIES} value={data.amenities.outdoor} onChange={(v) => update(["amenities", "outdoor"], v)} /></div>
//       </div>
//     </SectionCard>
//   );

//   const BedsBlock = (): JSX.Element => (
//     <SectionCard title="توزيع الأسرّة">
//       <div className="grid md:grid-cols-2 gap-4">
//         {BED_TYPES.map((b) => (
//           <div key={b.key} className="flex items-center justify-between border rounded-lg p-3 bg-secondary">
//             <span>{b.label}</span>
//             <Counter value={data.capacity.beds[b.key] || 0} min={0} max={20} onChange={(v) => update(["capacity", "beds", b.key], v)} />
//           </div>
//         ))}
//       </div>
//     </SectionCard>
//   );

//   const SharedSpacesBlock = (): JSX.Element => (
//     <SectionCard title="المساحات المشتركة">
//       <ChipMulti options={SHARED_SPACES} value={data.sharedSpaces} onChange={(v) => update(["sharedSpaces"], v)} />
//     </SectionCard>
//   );

//   const SeclusionBlock = (): JSX.Element => (
//     <SectionCard title="درجة العزلة">
//       <ChipMulti options={SECLUSION} value={data.seclusion.options} onChange={(v) => update(["seclusion", "options"], v)} />
//       <div className="mt-3">
//         <div className="text-sm mb-1">ملاحظة</div>
//         <Textarea rows={2} value={data.seclusion.note || ""} onChange={(e) => update(["seclusion", "note"], e.target.value)} />
//       </div>
//     </SectionCard>
//   );

//   const ActivitiesBlock = (): JSX.Element => (
//     <SectionCard title="الأنشطة">
//       <ChipMulti options={ACTIVITIES} value={data.activities.options} onChange={(v) => update(["activities", "options"], v)} />
//       <div className="mt-3">
//         <div className="text-sm mb-1">ملاحظة</div>
//         <Textarea rows={2} value={data.activities.note || ""} onChange={(e) => update(["activities", "note"], e.target.value)} />
//       </div>
//     </SectionCard>
//   );

//   const TerrainBlock = (): JSX.Element => (
//     <SectionCard title="التضاريس">
//       <ChipMulti options={TERRAINS} value={data.terrain.options} onChange={(v) => update(["terrain", "options"], v)} />
//       <div className="mt-3">
//         <div className="text-sm mb-1">المحيط</div>
//         <Textarea rows={3} value={data.terrain.surroundings || ""} onChange={(e) => update(["terrain", "surroundings"], e.target.value)} />
//       </div>
//     </SectionCard>
//   );

//   const PolicyBlock = (): JSX.Element => (
//     <SectionCard title="سياسة الإلغاء والتأمين" subtitle="حدّد سياسة الإلغاء وقيمة التأمين إن وجدت">
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <div className="text-sm mb-1">سياسة الإلغاء</div>
//           <Select value={data.policy.cancellation || "Flexible"} onValueChange={(v) => update(["policy", "cancellation"], v)}>
//             <SelectTrigger className="bg-secondary"><SelectValue placeholder="اختر السياسة" /></SelectTrigger>
//             <SelectContent className="bg-popover text-popover-foreground border-border">
//               <SelectItem value="Flexible">مرنة</SelectItem>
//               <SelectItem value="Moderate">متوسطة</SelectItem>
//               <SelectItem value="Strict">صارمة</SelectItem>
//               <SelectItem value="NonRefundable">غير قابلة للاسترداد</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <div className="text-sm mb-1">الاسترداد حتى (أيام قبل الوصول)</div>
//           <Input type="number" min={0} value={data.policy.refundableUntilDays ?? 0} onChange={(e) => update(["policy", "refundableUntilDays"], Math.max(0, Number(e.target.value) || 0))} />
//         </div>
//         <div>
//           <div className="text-sm mb-1">نسبة الاسترداد (%)</div>
//           <Input type="number" min={0} max={100} step={1} value={data.policy.refundPercent ?? 0} onChange={(e) => update(["policy", "refundPercent"], Math.max(0, Math.min(100, Number(e.target.value) || 0)))} />
//         </div>
//         <div>
//           <div className="text-sm mb-1">تأمين ضد التلفيات (عملة محلية)</div>
//           <Input type="number" min={0} step={1} value={data.policy.damageDeposit ?? 0} onChange={(e) => update(["policy", "damageDeposit"], Math.max(0, Number(e.target.value) || 0))} />
//         </div>
//         <div className="md:col-span-2">
//           <div className="text-sm mb-1">ملاحظات التأمين/الإلغاء</div>
//           <Textarea rows={3} value={data.policy.insuranceNotes || ""} onChange={(e) => update(["policy", "insuranceNotes"], e.target.value)} placeholder="تفاصيل إضافية إن وجدت" />
//         </div>
//       </div>
//     </SectionCard>
//   );

//   const renderStep = (): JSX.Element | null => {
//     const key = STEPS[step].key;
//     switch (key) {
//       case "p2":
//         return (
//           <SectionCard title="البيانات الأساسية">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <div className="text-sm mb-1">نوع الملكية</div>
//                 <Select value={data.basics.propertyType || ""} onValueChange={(v) => update(["basics", "propertyType"], v)}>
//                   <SelectTrigger className="bg-secondary"><SelectValue placeholder="اختر النوع" /></SelectTrigger>
//                   <SelectContent className="bg-popover text-popover-foreground border-border">
//                     {ACCOMMODATION_TYPES.map((t) => (<SelectItem key={t.key} value={t.key}>{t.label}</SelectItem>))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <div className="text-sm mb-1">اسم المخيم</div>
//                 <Input value={data.basics.name} onChange={(e) => update(["basics", "name"], e.target.value)} placeholder="مثال: مخيم الرمال الذهبية" />
//               </div>
//               <div className="md:col-span-2">
//                 <div className="text-sm mb-1">الموقع الإلكتروني</div>
//                 <Input value={data.basics.website || ""} onChange={(e) => update(["basics", "website"], e.target.value)} placeholder="https://..." />
//               </div>
//             </div>
//           </SectionCard>
//         );
//       case "p3":
//         return (
//           <SectionCard title="الموقع">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <div className="text-sm mb-1">الدولة</div>
//                 <Select value={data.location.country || ""} onValueChange={(v) => update(["location", "country"], v)}>
//                   <SelectTrigger className="bg-secondary"><SelectValue placeholder="اختر الدولة" /></SelectTrigger>
//                   <SelectContent className="bg-popover text-popover-foreground border-border">
//                     {COUNTRIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div><div className="text-sm mb-1">المحافظة/الولاية</div><Input value={data.location.state || ""} onChange={(e) => update(["location", "state"], e.target.value)} /></div>
//               <div><div className="text-sm mb-1">المدينة</div><Input value={data.location.city || ""} onChange={(e) => update(["location", "city"], e.target.value)} /></div>
//               <div><div className="text-sm mb-1">الرمز البريدي</div><Input value={data.location.zip || ""} onChange={(e) => update(["location", "zip"], e.target.value)} /></div>
//               <div className="md:col-span-2"><div className="text-sm mb-1">الشارع</div><Input value={data.location.street || ""} onChange={(e) => update(["location", "street"], e.target.value)} /></div>
//             </div>
//           </SectionCard>
//         );
//       case "p5":
//         return (
//           <SectionCard title="الوصف">
//             <div className="grid gap-4">
//               <div><div className="text-sm mb-1">ملخص</div><Textarea rows={6} value={data.description.summary || ""} onChange={(e) => update(["description", "summary"], e.target.value)} placeholder="نبذة مختصرة" /></div>
//               <div><div className="text-sm mb-1">خدمات الضيوف</div><Textarea rows={4} value={data.description.guestServices || ""} onChange={(e) => update(["description", "guestServices"], e.target.value)} placeholder="مثال: إفطار، جولات..." /></div>
//             </div>
//           </SectionCard>
//         );
//       case "p6":
//         return (
//           <SectionCard title="السعة والأسِرّة">
//             <div className="grid md:grid-cols-3 gap-4 mb-4">
//               <div><div className="text-sm mb-1">الضيوف كحد أقصى</div><Counter value={data.capacity.maxGuests} min={1} max={50} onChange={(v) => update(["capacity", "maxGuests"], v)} /></div>
//               <div><div className="text-sm mb-1">عدد الغرف</div><Counter value={data.capacity.bedrooms} min={0} max={20} onChange={(v) => update(["capacity", "bedrooms"], v)} /></div>
//             </div>
//             <BedsBlock />
//           </SectionCard>
//         );
//       case "p8":
//         return (
//           <SectionCard title="الصور">
//             <div className="space-y-3">
//               <input
//                 multiple
//                 accept="image/jpeg,image/png"
//                 type="file"
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files || []);
//                   update(["photos", "files"], files);
//                   update(["photos", "titles"], files.map(() => ""));
//                 }}
//                 className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:bg-background file:text-foreground"
//               />
//               {data.photos.files?.length > 0 ? (
//                 <div className="grid md:grid-cols-3 gap-3 mt-2">
//                   {data.photos.files.map((f, idx) => (
//                     <div key={idx} className="border rounded-lg p-2 bg-secondary">
//                       <p className="text-sm truncate">{f.name}</p>
//                       <Input
//                         placeholder="عنوان للصورة (اختياري)"
//                         value={data.photos.titles[idx] || ""}
//                         onChange={(e) => {
//                           const titles = [...data.photos.titles];
//                           titles[idx] = e.target.value;
//                           update(["photos", "titles"], titles);
//                         }}
//                         className="mt-2"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : null}
//             </div>
//           </SectionCard>
//         );
//       case "p9f":
//         return <FacilitiesBlock />;
//       case "p9":
//         return <AmenitiesBlock />;
//       case "p10":
//         return <SharedSpacesBlock />;
//       case "p11":
//         return <SeclusionBlock />;
//       case "p12":
//         return <ActivitiesBlock />;
//       case "p13":
//         return <TerrainBlock />;
//       case "p16":
//         return (
//           <SectionCard title="القواعد">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="md:col-span-3"><div className="text-sm mb-1">المسموحات</div><ChipMulti options={RULES} value={data.rules.allowed} onChange={(v) => update(["rules", "allowed"], v)} /></div>
//               <div><div className="text-sm mb-1">الحد الأدنى للعمر</div><Input type="number" min={0} value={data.rules.minAge ?? 0} onChange={(e) => update(["rules", "minAge"], Math.max(0, Number(e.target.value) || 0))} /></div>
//               <div><div className="text-sm mb-1">دخول من</div><Input type="time" value={data.rules.checkInFrom || ""} onChange={(e) => update(["rules", "checkInFrom"], e.target.value)} /></div>
//               <div><div className="text-sm mb-1">دخول إلى</div><Input type="time" value={data.rules.checkInTo || ""} onChange={(e) => update(["rules", "checkInTo"], e.target.value)} /></div>
//               <div><div className="text-sm mb-1">خروج</div><Input type="time" value={data.rules.checkOut || ""} onChange={(e) => update(["rules", "checkOut"], e.target.value)} /></div>
//             </div>
//           </SectionCard>
//         );
//       case "p17":
//         return (
//           <SectionCard title="الحجز">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div>
//                 <div className="text-sm mb-1">طريقة الحجز</div>
//                 <Select value={data.booking.method} onValueChange={(v) => update(["booking", "method"], v)}>
//                   <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
//                   <SelectContent className="bg-popover text-popover-foreground border-border">
//                     {BOOKING_METHODS.map((m) => (<SelectItem key={m.key} value={m.key}>{m.label}</SelectItem>))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div><div className="text-sm mb-1">إشعار مسبق (أيام)</div><Input type="number" min={0} value={data.booking.advanceNoticeDays ?? 0} onChange={(e) => update(["booking", "advanceNoticeDays"], Math.max(0, Number(e.target.value) || 0))} /></div>
//               <div><div className="text-sm mb-1">نافذة الحجز (أشهر)</div><Input type="number" min={1} value={data.booking.bookingWindowMonths ?? 12} onChange={(e) => update(["booking", "bookingWindowMonths"], Math.max(1, Number(e.target.value) || 1))} /></div>
//               <div className="md:col-span-3 flex items-center gap-3 mt-2">
//                 <input type="checkbox" checked={!!data.booking.syncCalendars} onChange={(e) => update(["booking", "syncCalendars"], e.target.checked)} />
//                 <span>مزامنة التقويمات</span>
//                 {data.booking.syncCalendars ? (
//                   <Input placeholder="Airbnb / Booking / Google" value={data.booking.calendarProvider || ""} onChange={(e) => update(["booking", "calendarProvider"], e.target.value)} className="ml-3" />
//                 ) : null}
//               </div>
//             </div>
//           </SectionCard>
//         );
//       case "p18":
//         return (
//           <SectionCard title="الأسعار">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div><div className="text-sm mb-1">الحد الأدنى لليالي</div><Input type="number" min={1} value={data.pricing.minNights ?? 1} onChange={(e) => update(["pricing", "minNights"], Math.max(1, Number(e.target.value) || 1))} /></div>
//               <div><div className="text-sm mb-1">سعر الليلة</div><Input type="number" min={1} value={data.pricing.nightly ?? 0} onChange={(e) => update(["pricing", "nightly"], Math.max(1, Number(e.target.value) || 1))} /></div>
//               <div><div className="text-sm mb-1">خصم أسبوعي (%)</div><Input type="number" min={0} max={100} step={0.5} value={data.pricing.weeklyDiscountPct ?? 0} onChange={(e) => update(["pricing", "weeklyDiscountPct"], Math.max(0, Math.min(100, Number(e.target.value) || 0)))} /></div>
//             </div>
//           </SectionCard>
//         );
//       case "p18p":
//         return <PolicyBlock />;
//       case "p19":
//         return (
//           <SectionCard title="مراجعة قبل الإرسال" subtitle="راجِع بياناتك قبل الإرسال">
//             <ul className="text-sm leading-7 list-disc pr-5">
//               <li>الاسم: {data.basics.name}</li>
//               <li>النوع: {ACCOMMODATION_TYPES.find(x => x.key === data.basics.propertyType)?.label || "-"}</li>
//               <li>الدولة/الولاية/المدينة: {(data.location.country || "-")} / {(data.location.state || "-")} / {(data.location.city || "-")}</li>
//               <li>السعة: {data.capacity.maxGuests}, الغرف: {data.capacity.bedrooms}</li>
//               <li>عدد الصور: {data.photos.files?.length || 0}</li>
//               <li>سعر الليلة: {data.pricing.nightly ?? "-"}</li>
//               <li>سياسة الإلغاء: {data.policy.cancellation || "-"}, التأمين: {data.policy.damageDeposit ?? 0}</li>
//             </ul>
//           </SectionCard>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="inline-flex" dir="rtl">
//       <Button onClick={() => setOpen(true)} className="inline-flex items-center gap-2">
//         <Plus className="h-4 w-4" />
//         إضافة مخيم
//       </Button>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-3xl bg-card text-card-foreground">
//           <DialogHeader>
//             <DialogTitle>إضافة مخيم (طلب انضمام)</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             <StepHeader />
//             {renderStep()}

//             <div className="flex items-center justify-between pt-2">
//               <Button variant="outline" onClick={goBack} disabled={step === 0 || submitting}>رجوع</Button>
//               {step < STEPS.length - 1 ? (
//                 <Button onClick={goNext} disabled={submitting}>التالي</Button>
//               ) : (
//                 <Button onClick={submit} disabled={submitting}>
//                   {submitting ? (<><Loader2 className="h-4 w-4 animate-spin mr-2" />جارٍ الإرسال...</>) : ("إرسال الطلب")}
//                 </Button>
//               )}
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


































// // src/pages/Dashboard/AddCampRequestWizard.tsx
// import React, { useMemo, useState } from "react";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { Textarea } from "../components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
// import { Checkbox } from "../components/ui/checkbox";
// import { useToast } from "../components/ui/use-toast";
// import { api } from "../lib/api";
// import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

// /* القوائم */
// const propertyTypes = ["خيمة","نُزل","عريش","كرافان","بود","غلمبينغ"];
// const countriesList = [
//   { code: "OM", label: "عُمان (Oman)" },
//   { code: "AE", label: "الإمارات (UAE)" },
//   { code: "SA", label: "السعودية (KSA)" },
//   { code: "QA", label: "قطر (Qatar)" },
//   { code: "KW", label: "الكويت (Kuwait)" },
//   { code: "BH", label: "البحرين (Bahrain)" },
//   { code: "JO", label: "الأردن (Jordan)" },
//   { code: "EG", label: "مصر (Egypt)" },
//   { code: "MA", label: "المغرب (Morocco)" },
//   { code: "TN", label: "تونس (Tunisia)" },
//   { code: "LB", label: "لبنان (Lebanon)" },
// ];

// const basicAmenities = ["WiFi","تكييف","تدفئة","مولد كهرباء","إضاءة"];
// const bathAmenities = ["حمام خاص","دش ساخن","مناشف","صابون","شامبو"];
// const kitchenAmenities = ["مطبخ مجهز","ثلاجة","موقد","أواني طبخ","مياه شرب"];
// const outdoorAmenities = ["شواء","جلسة خارجية","كراسي","طاولة","مظلة"];
// const facilities = ["موقف سيارات","أمن","نظافة","استقبال 24 ساعة","خدمة غرف"];
// const sharedSpaces = ["صالة مشتركة","مطبخ مشترك","حديقة","مسبح","ملعب"];
// const activities = ["رحلات استكشافية","سفاري","صيد","سباحة","تسلق","نجوم"];
// const terrainOptions = ["صحراء","جبال","شاطئ","واحة","غابة","سهول"];
// const seclusionOptions = ["منعزل تماماً","شبه منعزل","بجانب مخيمات أخرى","في منطقة سياحية"];

// /* الأسرّة بعدّادات */
// const bedTypes = [
//   { key: "king", label: "سرير مزدوج كبير (كينغ)" },
//   { key: "queen", label: "سرير مزدوج (كوين)" },
//   { key: "double", label: "سرير مزدوج عادي" },
//   { key: "twin", label: "سرير مفرد" },
//   { key: "bunk", label: "سرير بطابقين" },
//   { key: "sofa", label: "سرير أريكة" },
//   { key: "crib", label: "سرير أطفال" },
//   { key: "air", label: "سرير هوائي / قابل للنفخ" },
// ];

// type WizardData = {
//   basics: { name: string; propertyType: string; website?: string | null; };
//   description: { summary: string; guestServices?: string | null; };
//   location: { country: string; state: string; city: string; zip?: string | null; street: string; };
//   capacity: { maxGuests: number; bedrooms: number; beds: Record<string, number>; };
//   features: { amenities: { basic: string[]; bath: string[]; kitchen: string[]; outdoor: string[]; }; facilities: string[]; };
//   environment: { terrain: string[]; seclusion: string; activities: string[]; sharedSpaces: string[]; };
//   rules: {
//     checkInFrom: string; checkInTo: string; checkOut: string;
//     minAge: number; additionalRules?: string | null;
//   };
//   pricing: {
//     weekday_with_accommodation: number;
//     weekday_without_accommodation: number;
//     holiday_with_accommodation: number;
//     holiday_without_accommodation: number;
//   };
//   files: File[];
// };

// export default function AddCampRequestWizard({ onCancel, onSuccess }: { onCancel?: () => void; onSuccess?: () => void; }) {
//   const { toast } = useToast();

//   const [form, setForm] = useState<WizardData>({
//     basics: { name: "", propertyType: "", website: "" },
//     description: { summary: "", guestServices: "" },
//     location: { country: "", state: "", city: "", zip: "", street: "" },
//     capacity: { maxGuests: 1, bedrooms: 0, beds: bedTypes.reduce((a, b) => ({ ...a, [b.key]: 0 }), {} as Record<string, number>) },
//     features: { amenities: { basic: [], bath: [], kitchen: [], outdoor: [] }, facilities: [] },
//     environment: { terrain: [], seclusion: "", activities: [], sharedSpaces: [] },
//     rules: { checkInFrom: "14:00", checkInTo: "22:00", checkOut: "12:00", minAge: 18, additionalRules: "" },
//     pricing: { weekday_with_accommodation: 0, weekday_without_accommodation: 0, holiday_with_accommodation: 0, holiday_without_accommodation: 0 },
//     files: [],
//   });

//   const steps = useMemo(() => ([
//     { key: "basics", title: "الأساسيات" },
//     { key: "location", title: "الموقع" },
//     { key: "description", title: "الوصف" },
//     { key: "capacity", title: "السعة والأسِرّة" },
//     { key: "features", title: "المرافق والمزايا" },
//     { key: "environment", title: "البيئة والأنشطة" },
//     { key: "rulesPricing", title: "القواعد والتسعير" },
//     { key: "images", title: "الصور" },
//     { key: "review", title: "مراجعة" },
//   ]), []);

//   const [stepIndex, setStepIndex] = useState(0);
//   const isFirst = stepIndex === 0;
//   const isLast = stepIndex === steps.length - 1;

//   const validateStep = () => {
//     const k = steps[stepIndex].key;

//     if (k === "basics") {
//       if (!form.basics.name.trim()) { toast({ title: "اسم المخيم مطلوب", variant: "destructive" }); return false; }
//       if (!form.basics.propertyType) { toast({ title: "نوع الملكية مطلوب", variant: "destructive" }); return false; }
//       if (!form.description.summary.trim()) { toast({ title: "وصف المخيم مطلوب", variant: "destructive" }); return false; }
//     }

//     if (k === "location") {
//       if (!form.location.country.trim()) { toast({ title: "الدولة مطلوبة", variant: "destructive" }); return false; }
//       if (!form.location.state.trim()) { toast({ title: "المحافظة/الولاية مطلوبة", variant: "destructive" }); return false; }
//       if (!form.location.city.trim()) { toast({ title: "المدينة مطلوبة", variant: "destructive" }); return false; }
//       if (!form.location.street.trim()) { toast({ title: "العنوان التفصيلي مطلوب", variant: "destructive" }); return false; }
//     }

//     if (k === "capacity") {
//       const totalBeds = Object.values(form.capacity.beds || {}).reduce((s, v) => s + Number(v || 0), 0);
//       if (form.capacity.maxGuests < 1) { toast({ title: "أقصى عدد ضيوف لا يقل عن 1", variant: "destructive" }); return false; }
//       if (totalBeds < 1) { toast({ title: "أضف سريراً واحداً على الأقل", variant: "destructive" }); return false; }
//     }

//     if (k === "rulesPricing") {
//       if ((form.rules.minAge ?? 0) < 0) { toast({ title: "الحد الأدنى للعمر غير صالح", variant: "destructive" }); return false; }
//       const p = form.pricing;
//       const prices = [p.weekday_with_accommodation, p.weekday_without_accommodation, p.holiday_with_accommodation, p.holiday_without_accommodation];
//       const hasInvalid = prices.some((x) => !(Number.isFinite(x) && x >= 0));
//       if (hasInvalid) { toast({ title: "تحقق من الأسعار", description: "أدخل قيم صحيحة.", variant: "destructive" }); return false; }
//       if (prices.every(x => x === 0)) { toast({ title: "يجب إدخال سعر واحد على الأقل", variant: "destructive" }); return false; }
//     }

//     if (k === "images") {
//       if ((form.files?.length || 0) < 5) { toast({ title: "الصور مطلوبة", description: "أرفع 5 صور على الأقل.", variant: "destructive" }); return false; }
//     }

//     return true;
//   };

//   const next = () => { if (validateStep()) setStepIndex((i) => Math.min(i + 1, steps.length - 1)); };
//   const prev = () => setStepIndex((i) => Math.max(i - 1, 0));

//   const submit = async () => {
//     try {
//       const payload = {
//         basics: {
//           name: form.basics.name.trim(),
//           propertyType: form.basics.propertyType || null,
//           website: form.basics.website || null
//         },
//         description: {
//           summary: form.description.summary || null,
//           guestServices: form.description.guestServices || null
//         },
//         location: {
//           country: form.location.country || null,
//           state: form.location.state || null,
//           city: form.location.city || null,
//           zip: form.location.zip || null,
//           street: form.location.street || null
//         },
//         capacity: {
//           maxGuests: form.capacity.maxGuests,
//           bedrooms: form.capacity.bedrooms,
//           beds: form.capacity.beds
//         },
//         facilities: form.features.facilities,
//         amenities: form.features.amenities,
//         sharedSpaces: form.environment.sharedSpaces,
//         seclusion: form.environment.seclusion ? [form.environment.seclusion] : [],
//         activities: { options: form.environment.activities },
//         terrain: form.environment.terrain,
//         rules: {
//           checkInFrom: form.rules.checkInFrom,
//           checkInTo: form.rules.checkInTo,
//           checkOut: form.rules.checkOut,
//           minAge: form.rules.minAge,
//           additionalRules: form.rules.additionalRules || null
//         },
//         booking: {},
//         pricing: {
//           weekday: {
//             withAccommodation: form.pricing.weekday_with_accommodation,
//             withoutAccommodation: form.pricing.weekday_without_accommodation
//           },
//           holiday: {
//             withAccommodation: form.pricing.holiday_with_accommodation,
//             withoutAccommodation: form.pricing.holiday_without_accommodation
//           }
//         }
//       };

//       const fd = new FormData();
//       fd.append("joinDataJson", JSON.stringify(payload));
//       for (const f of form.files) fd.append("images", f);

//       await api.post("/api/camp-requests", fd, { headers: { "Content-Type": "multipart/form-data" } });

//       toast({ title: "تم إرسال طلب الإضافة بنجاح!", description: "سيتم مراجعته خلال 3-5 أيام عمل." });
//       onSuccess?.();
//     } catch (err: any) {
//       const message = err?.response?.data?.message || "تعذر إرسال الطلب. حاول مجددًا.";
//       toast({ title: "خطأ", description: message, variant: "destructive" });
//     }
//   };

//   const StepHeader = () => {
//     const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
//     return (
//       <div className="mb-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-bold text-foreground">{steps[stepIndex].title}</h2>
//           <span className="text-sm text-muted-foreground">{stepIndex + 1} / {steps.length}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//           <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
//         </div>
//       </div>
//     );
//   };

//   const renderStep = () => {
//     const k = steps[stepIndex].key;

//     if (k === "basics")
//       return (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium">اسم المخيم *</label>
//               <Input value={form.basics.name} onChange={(e) => setForm((d) => ({ ...d, basics: { ...d.basics, name: e.target.value } }))} placeholder="مثال: مخيم الرمال الذهبية" />
//             </div>
//             <div>
//               <label className="text-sm font-medium">نوع الملكية *</label>
//               <Select value={form.basics.propertyType} onValueChange={(v) => setForm((d) => ({ ...d, basics: { ...d.basics, propertyType: v } }))}>
//                 <SelectTrigger><SelectValue placeholder="اختر النوع" /></SelectTrigger>
//                 <SelectContent>
//                   {propertyTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="md:col-span-2">
//               <label className="text-sm font-medium">الموقع الإلكتروني (اختياري)</label>
//               <Input value={form.basics.website || ""} onChange={(e) => setForm((d) => ({ ...d, basics: { ...d.basics, website: e.target.value } }))} placeholder="https://example.com" />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium">وصف المخيم *</label>
//             <Textarea rows={4} value={form.description.summary} onChange={(e) => setForm((d) => ({ ...d, description: { ...d.description, summary: e.target.value } }))} placeholder="اكتب وصفاً جذاباً لمخيمك..." />
//           </div>

//           <div>
//             <label className="text-sm font-medium">خدمات إضافية للضيوف (اختياري)</label>
//             <Textarea rows={3} value={form.description.guestServices || ""} onChange={(e) => setForm((d) => ({ ...d, description: { ...d.description, guestServices: e.target.value } }))} placeholder="توصيل من المطار، جولات سياحية..." />
//           </div>
//         </div>
//       );

//     if (k === "location")
//       return (
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium">الدولة *</label>
//               <Select value={form.location.country} onValueChange={(v) => setForm((d) => ({ ...d, location: { ...d.location, country: v } }))}>
//                 <SelectTrigger><SelectValue placeholder="اختر الدولة" /></SelectTrigger>
//                 <SelectContent>
//                   {countriesList.map((ct) => <SelectItem key={ct.code} value={ct.label}>{ct.label}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <label className="text-sm font-medium">المحافظة/الولاية *</label>
//               <Input value={form.location.state} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, state: e.target.value } }))} />
//             </div>
//             <div>
//               <label className="text-sm font-medium">المدينة *</label>
//               <Input value={form.location.city} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, city: e.target.value } }))} />
//             </div>
//             <div>
//               <label className="text-sm font-medium">الرمز البريدي</label>
//               <Input value={form.location.zip || ""} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, zip: e.target.value } }))} />
//             </div>
//             <div className="md:col-span-2">
//               <label className="text-sm font-medium">العنوان التفصيلي *</label>
//               <Input value={form.location.street} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, street: e.target.value } }))} placeholder="الشارع، المعالم القريبة..." />
//             </div>
//           </div>
//         </div>
//       );

//     if (k === "description")
//       return (
//         <div className="space-y-2">
//           <label className="text-sm font-medium">تفاصيل إضافية (اختياري)</label>
//           <Textarea rows={5} value={form.description.guestServices || ""} onChange={(e) => setForm((d) => ({ ...d, description: { ...d.description, guestServices: e.target.value } }))} placeholder="أدخل أي تفاصيل إضافية ترغب بعرضها." />
//         </div>
//       );

//     if (k === "capacity") {
//       const setBed = (key: string, val: number) =>
//         setForm((d) => ({ ...d, capacity: { ...d.capacity, beds: { ...d.capacity.beds, [key]: Math.max(0, Math.min(20, val)) } } }));

//       const totalBeds = Object.values(form.capacity.beds).reduce((s, v) => s + Number(v || 0), 0);

//       return (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium">أقصى عدد ضيوف *</label>
//               <Input type="number" min={1} value={form.capacity.maxGuests} onChange={(e) => setForm((d) => ({ ...d, capacity: { ...d.capacity, maxGuests: Math.max(1, Number(e.target.value) || 1) } }))} />
//             </div>
//             <div>
//               <label className="text-sm font-medium">عدد غرف النوم</label>
//               <Input type="number" min={0} value={form.capacity.bedrooms} onChange={(e) => setForm((d) => ({ ...d, capacity: { ...d.capacity, bedrooms: Math.max(0, Number(e.target.value) || 0) } }))} />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <label className="text-sm font-medium">أنواع الأسرّة المتوفرة</label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {bedTypes.map((b) => (
//                 <div key={b.key} className="flex items-center justify-between border rounded-lg p-3">
//                   <span className="text-sm">{b.label}</span>
//                   <div className="flex items-center gap-2">
//                     <Button type="button" variant="outline" onClick={() => setBed(b.key, (form.capacity.beds[b.key] || 0) - 1)}>−</Button>
//                     <Input type="number" min={0} className="w-20 text-center" value={form.capacity.beds[b.key] || 0} onChange={(e) => setBed(b.key, Number(e.target.value) || 0)} />
//                     <Button type="button" variant="outline" onClick={() => setBed(b.key, (form.capacity.beds[b.key] || 0) + 1)}>+</Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <p className="text-xs text-muted-foreground">إجمالي الأسرّة: {totalBeds}</p>
//           </div>
//         </div>
//       );
//     }

//     if (k === "features")
//       return (
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">الخدمات الأساسية</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {basicAmenities.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.features.amenities.basic.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.features.amenities.basic);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, basic: Array.from(arr) } } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">مرافق الحمام</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {bathAmenities.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.features.amenities.bath.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.features.amenities.bath);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, bath: Array.from(arr) } } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">مرافق المطبخ</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {kitchenAmenities.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.features.amenities.kitchen.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.features.amenities.kitchen);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, kitchen: Array.from(arr) } } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">مرافق خارجية</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {outdoorAmenities.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.features.amenities.outdoor.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.features.amenities.outdoor);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, outdoor: Array.from(arr) } } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">خدمات عامة</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {facilities.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.features.facilities.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.features.facilities);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, features: { ...d.features, facilities: Array.from(arr) } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>
//       );

//     if (k === "environment")
//       return (
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">نوع التضاريس</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {terrainOptions.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.environment.terrain.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.environment.terrain);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, environment: { ...d.environment, terrain: Array.from(arr) } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-3">
//             <label className="text-md font-semibold">مستوى العزلة</label>
//             <Select value={form.environment.seclusion || ""} onValueChange={(v) => setForm((d) => ({ ...d, environment: { ...d.environment, seclusion: v } }))}>
//               <SelectTrigger><SelectValue placeholder="اختر مستوى العزلة" /></SelectTrigger>
//               <SelectContent>
//                 {seclusionOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">أنشطة متوفرة</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {activities.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.environment.activities.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.environment.activities);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, environment: { ...d.environment, activities: Array.from(arr) } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-3">
//             <h3 className="text-md font-semibold">مساحات مشتركة</h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {sharedSpaces.map((item) => (
//                 <label key={item} className="flex items-center space-x-2 space-x-reverse">
//                   <Checkbox checked={form.environment.sharedSpaces.includes(item)} onCheckedChange={() => {
//                     const arr = new Set(form.environment.sharedSpaces);
//                     arr.has(item) ? arr.delete(item) : arr.add(item);
//                     setForm((d) => ({ ...d, environment: { ...d.environment, sharedSpaces: Array.from(arr) } }));
//                   }} />
//                   <span className="text-sm cursor-pointer">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>
//       );

//     if (k === "rulesPricing")
//       return (
//         <div className="space-y-6">
//           <div className="space-y-4">
//             <h3 className="text-md font-semibold">أوقات الدخول والخروج</h3>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="text-sm font-medium">بداية وقت الدخول</label>
//                 <Input type="time" value={form.rules.checkInFrom} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, checkInFrom: e.target.value } }))} />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">نهاية وقت الدخول</label>
//                 <Input type="time" value={form.rules.checkInTo} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, checkInTo: e.target.value } }))} />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">وقت الخروج</label>
//                 <Input type="time" value={form.rules.checkOut} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, checkOut: e.target.value } }))} />
//               </div>
//               <div>
//                 <label className="text-sm font-medium">الحد الأدنى للعمر (سنة)</label>
//                 <Input type="number" min={0} value={form.rules.minAge} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, minAge: Math.max(0, Number(e.target.value) || 0) } }))} />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-md font-semibold">التسعير (بالريال العماني) *</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-3 p-4 border rounded-lg">
//                 <h4 className="font-medium text-center">الأيام العادية</h4>
//                 <div>
//                   <label className="text-sm">مع المبيت</label>
//                   <Input type="number" min={0} step="0.5" value={form.pricing.weekday_with_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, weekday_with_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
//                 </div>
//                 <div>
//                   <label className="text-sm">بدون المبيت</label>
//                   <Input type="number" min={0} step="0.5" value={form.pricing.weekday_without_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, weekday_without_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
//                 </div>
//               </div>
//               <div className="space-y-3 p-4 border rounded-lg">
//                 <h4 className="font-medium text-center">أيام العطل والمناسبات</h4>
//                 <div>
//                   <label className="text-sm">مع المبيت</label>
//                   <Input type="number" min={0} step="0.5" value={form.pricing.holiday_with_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, holiday_with_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
//                 </div>
//                 <div>
//                   <label className="text-sm">بدون المبيت</label>
//                   <Input type="number" min={0} step="0.5" value={form.pricing.holiday_without_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, holiday_without_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
//                 </div>
//               </div>
//             </div>
//             <div className="text-xs text-muted-foreground">اترك غير المتاح بقيمة 0.</div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">قواعد وشروط إضافية (اختياري)</label>
//             <Textarea rows={3} value={form.rules.additionalRules || ""} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, additionalRules: e.target.value } }))} placeholder="مثال: هدوء بعد 10 م، ممنوع التدخين..." />
//           </div>
//         </div>
//       );

//     if (k === "images")
//       return (
//         <div className="space-y-4">
//           <div>
//             <label className="text-sm font-medium">صور المخيم *</label>
//             <Input type="file" multiple accept="image/*" onChange={(e) => setForm((d) => ({ ...d, files: Array.from(e.target.files || []) }))} />
//             <div className="text-xs text-muted-foreground mt-2">ارفع 5 صور على الأقل. الصورة الأولى ستكون الرئيسية.</div>
//           </div>
//           {form.files.length > 0 && <div className="text-sm text-green-600">تم اختيار {form.files.length} صورة</div>}
//         </div>
//       );

//     if (k === "review") {
//       const totalBeds = Object.values(form.capacity.beds || {}).reduce((s, v) => s + Number(v || 0), 0);
//       return (
//         <div className="space-y-6 text-sm">
//           <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /> مراجعة البيانات قبل الإرسال</div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <h4 className="font-semibold">المخيم</h4>
//               <div><strong>الاسم:</strong> {form.basics.name || "-"}</div>
//               <div><strong>النوع:</strong> {form.basics.propertyType || "-"}</div>
//               <div><strong>الموقع:</strong> {[form.location.city, form.location.state, form.location.country].filter(Boolean).join(", ") || "-"}</div>
//             </div>
//             <div className="space-y-2">
//               <h4 className="font-semibold">الوصف</h4>
//               <div><strong>الملخص:</strong> {form.description.summary || "-"}</div>
//               <div><strong>الخدمات:</strong> {form.description.guestServices || "-"}</div>
//             </div>
//             <div className="space-y-2">
//               <h4 className="font-semibold">السعة</h4>
//               <div><strong>الضيوف:</strong> {form.capacity.maxGuests}</div>
//               <div><strong>غرف النوم:</strong> {form.capacity.bedrooms}</div>
//               <div><strong>إجمالي الأسرّة:</strong> {totalBeds}</div>
//             </div>
//             <div className="space-y-2">
//               <h4 className="font-semibold">التسعير</h4>
//               <div><strong>عادي مع مبيت:</strong> {form.pricing.weekday_with_accommodation || 0}</div>
//               <div><strong>عادي بدون مبيت:</strong> {form.pricing.weekday_without_accommodation || 0}</div>
//               <div><strong>عطلة مع مبيت:</strong> {form.pricing.holiday_with_accommodation || 0}</div>
//               <div><strong>عطلة بدون مبيت:</strong> {form.pricing.holiday_without_accommodation || 0}</div>
//             </div>
//             <div className="space-y-2">
//               <h4 className="font-semibold">الخدمات والبيئة</h4>
//               <div><strong>أساسية:</strong> {(form.features.amenities.basic || []).length} عنصر</div>
//               <div><strong>حمام:</strong> {(form.features.amenities.bath || []).length} عنصر</div>
//               <div><strong>مطبخ:</strong> {(form.features.amenities.kitchen || []).length} عنصر</div>
//               <div><strong>خارجية:</strong> {(form.features.amenities.outdoor || []).length} عنصر</div>
//               <div><strong>تضاريس:</strong> {(form.environment.terrain || []).length} نوع</div>
//               <div><strong>أنشطة:</strong> {(form.environment.activities || []).length} نشاط</div>
//               <div><strong>عزلة:</strong> {form.environment.seclusion || "-"}</div>
//               <div><strong>صور:</strong> {form.files.length}</div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div dir="rtl">
//       <div className="rounded-lg border bg-card p-6">
//         <StepHeader />
//         {renderStep()}
//       </div>

//       <div className="mt-6 flex items-center justify-between">
//         <Button variant="outline" onClick={isFirst ? onCancel : prev} className="inline-flex items-center gap-2">
//           <ChevronRight className="h-4 w-4 rotate-180" /> {isFirst ? "إلغاء" : "السابق"}
//         </Button>
//         {!isLast ? (
//           <Button onClick={next} className="inline-flex items-center gap-2">
//             التالي <ChevronLeft className="h-4 w-4" />
//           </Button>
//         ) : (
//           <Button onClick={submit} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700">
//             إرسال الطلب <CheckCircle2 className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }





























// src/pages/Dashboard/AddCampRequestWizard.tsx
import React, { useMemo, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../components/ui/use-toast";
import { api } from "../lib/api";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

/* القوائم */
const propertyTypes = ["خيمة","نُزل","عريش","كرافان","بود","غلمبينغ"];
const countriesList = [
  { code: "OM", label: "عُمان (Oman)" },
  { code: "AE", label: "الإمارات (UAE)" },
  { code: "SA", label: "السعودية (KSA)" },
  { code: "QA", label: "قطر (Qatar)" },
  { code: "KW", label: "الكويت (Kuwait)" },
  { code: "BH", label: "البحرين (Bahrain)" },
  { code: "JO", label: "الأردن (Jordan)" },
  { code: "EG", label: "مصر (Egypt)" },
  { code: "MA", label: "المغرب (Morocco)" },
  { code: "TN", label: "تونس (Tunisia)" },
  { code: "LB", label: "لبنان (Lebanon)" },
];

const basicAmenities = ["WiFi","تكييف","تدفئة","مولد كهرباء","إضاءة"];
const bathAmenities = ["حمام خاص","دش ساخن","مناشف","صابون","شامبو"];
const kitchenAmenities = ["مطبخ مجهز","ثلاجة","موقد","أواني طبخ","مياه شرب"];
const outdoorAmenities = ["شواء","جلسة خارجية","كراسي","طاولة","مظلة"];
const facilities = ["موقف سيارات","أمن","نظافة","استقبال 24 ساعة","خدمة غرف"];
const sharedSpaces = ["صالة مشتركة","مطبخ مشترك","حديقة","مسبح","ملعب"];
const activities = ["رحلات استكشافية","سفاري","صيد","سباحة","تسلق","نجوم"];
const terrainOptions = ["صحراء","جبال","شاطئ","واحة","غابة","سهول"];
const seclusionOptions = ["منعزل تماماً","شبه منعزل","بجانب مخيمات أخرى","في منطقة سياحية"];

/* الأسرّة بعدّادات */
const bedTypes = [
  { key: "king", label: "سرير مزدوج كبير (كينغ)" },
  { key: "queen", label: "سرير مزدوج (كوين)" },
  { key: "double", label: "سرير مزدوج عادي" },
  { key: "twin", label: "سرير مفرد" },
  { key: "bunk", label: "سرير بطابقين" },
  { key: "sofa", label: "سرير أريكة" },
  { key: "crib", label: "سرير أطفال" },
  { key: "air", label: "سرير هوائي / قابل للنفخ" },
];

type WizardData = {
  basics: { name: string; propertyType: string; website?: string | null; };
  description: { summary: string; guestServices?: string | null; };
  location: { country: string; state: string; city: string; zip?: string | null; street: string; };
  capacity: { maxGuests: number; bedrooms: number; beds: Record<string, number>; };
  features: { amenities: { basic: string[]; bath: string[]; kitchen: string[]; outdoor: string[]; }; facilities: string[]; };
  environment: { terrain: string[]; seclusion: string; activities: string[]; sharedSpaces: string[]; };
  rules: {
    checkInFrom: string; checkInTo: string; checkOut: string;
    minAge: number; additionalRules?: string | null;
  };
  pricing: {
    weekday_with_accommodation: number;
    weekday_without_accommodation: number;
    holiday_with_accommodation: number;
    holiday_without_accommodation: number;
  };
  files: File[];
};

export default function AddCampRequestWizard({ onCancel, onSuccess }: { onCancel?: () => void; onSuccess?: () => void; }) {
  const { toast } = useToast();

  const [form, setForm] = useState<WizardData>({
    basics: { name: "", propertyType: "", website: "" },
    description: { summary: "", guestServices: "" },
    location: { country: "", state: "", city: "", zip: "", street: "" },
    capacity: { maxGuests: 1, bedrooms: 0, beds: bedTypes.reduce((a, b) => ({ ...a, [b.key]: 0 }), {} as Record<string, number>) },
    features: { amenities: { basic: [], bath: [], kitchen: [], outdoor: [] }, facilities: [] },
    environment: { terrain: [], seclusion: "", activities: [], sharedSpaces: [] },
    rules: { checkInFrom: "14:00", checkInTo: "22:00", checkOut: "12:00", minAge: 18, additionalRules: "" },
    pricing: { weekday_with_accommodation: 0, weekday_without_accommodation: 0, holiday_with_accommodation: 0, holiday_without_accommodation: 0 },
    files: [],
  });

  const steps = useMemo(() => ([
    { key: "basics", title: "الأساسيات" },
    { key: "location", title: "الموقع" },
    { key: "description", title: "الوصف" },
    { key: "capacity", title: "السعة والأسِرّة" },
    { key: "features", title: "المرافق والمزايا" },
    { key: "environment", title: "البيئة والأنشطة" },
    { key: "rulesPricing", title: "القواعد والتسعير" },
    { key: "images", title: "الصور" },
    { key: "review", title: "مراجعة" },
  ]), []);

  const [stepIndex, setStepIndex] = useState(0);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  const validateStep = () => {
    const k = steps[stepIndex].key;

    if (k === "basics") {
      if (!form.basics.name.trim()) { toast({ title: "اسم المخيم مطلوب", variant: "destructive" }); return false; }
      if (!form.basics.propertyType) { toast({ title: "نوع الملكية مطلوب", variant: "destructive" }); return false; }
      if (!form.description.summary.trim()) { toast({ title: "وصف المخيم مطلوب", variant: "destructive" }); return false; }
    }

    if (k === "location") {
      if (!form.location.country.trim()) { toast({ title: "الدولة مطلوبة", variant: "destructive" }); return false; }
      if (!form.location.state.trim()) { toast({ title: "المحافظة/الولاية مطلوبة", variant: "destructive" }); return false; }
      if (!form.location.city.trim()) { toast({ title: "المدينة مطلوبة", variant: "destructive" }); return false; }
      if (!form.location.street.trim()) { toast({ title: "العنوان التفصيلي مطلوب", variant: "destructive" }); return false; }
    }

    if (k === "capacity") {
      const totalBeds = Object.values(form.capacity.beds || {}).reduce((s, v) => s + Number(v || 0), 0);
      if (form.capacity.maxGuests < 1) { toast({ title: "أقصى عدد ضيوف لا يقل عن 1", variant: "destructive" }); return false; }
      if (totalBeds < 1) { toast({ title: "أضف سريراً واحداً على الأقل", variant: "destructive" }); return false; }
    }

    if (k === "rulesPricing") {
      if ((form.rules.minAge ?? 0) < 0) { toast({ title: "الحد الأدنى للعمر غير صالح", variant: "destructive" }); return false; }
      const p = form.pricing;
      const prices = [p.weekday_with_accommodation, p.weekday_without_accommodation, p.holiday_with_accommodation, p.holiday_without_accommodation];
      const hasInvalid = prices.some((x) => !(Number.isFinite(x) && x >= 0));
      if (hasInvalid) { toast({ title: "تحقق من الأسعار", description: "أدخل قيم صحيحة.", variant: "destructive" }); return false; }
      if (prices.every(x => x === 0)) { toast({ title: "يجب إدخال سعر واحد على الأقل", variant: "destructive" }); return false; }
    }

    if (k === "images") {
      if ((form.files?.length || 0) < 5) { toast({ title: "الصور مطلوبة", description: "أرفع 5 صور على الأقل.", variant: "destructive" }); return false; }
    }

    return true;
  };

  const next = () => { if (validateStep()) setStepIndex((i) => Math.min(i + 1, steps.length - 1)); };
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const submit = async () => {
    try {
      const payload = {
        basics: {
          name: form.basics.name.trim(),
          propertyType: form.basics.propertyType || null,
          website: form.basics.website || null
        },
        description: {
          summary: form.description.summary || null,
          guestServices: form.description.guestServices || null
        },
        location: {
          country: form.location.country || null,
          state: form.location.state || null,
          city: form.location.city || null,
          zip: form.location.zip || null,
          street: form.location.street || null
        },
        capacity: {
          maxGuests: form.capacity.maxGuests,
          bedrooms: form.capacity.bedrooms,
          beds: form.capacity.beds
        },
        facilities: form.features.facilities,
        amenities: form.features.amenities,
        sharedSpaces: form.environment.sharedSpaces,
        seclusion: form.environment.seclusion ? [form.environment.seclusion] : [],
        activities: { options: form.environment.activities },
        terrain: form.environment.terrain,
        rules: {
          checkInFrom: form.rules.checkInFrom,
          checkInTo: form.rules.checkInTo,
          checkOut: form.rules.checkOut,
          minAge: form.rules.minAge,
          additionalRules: form.rules.additionalRules || null
        },
        booking: {},
        pricing: {
          weekday: {
            withAccommodation: form.pricing.weekday_with_accommodation,
            withoutAccommodation: form.pricing.weekday_without_accommodation
          },
          holiday: {
            withAccommodation: form.pricing.holiday_with_accommodation,
            withoutAccommodation: form.pricing.holiday_without_accommodation
          }
        }
      };

      const fd = new FormData();
      fd.append("joinDataJson", JSON.stringify(payload));
      for (const f of form.files) fd.append("images", f);

      await api.post("/api/camp-requests", fd, { headers: { "Content-Type": "multipart/form-data" } });

      toast({ title: "تم إرسال طلب الإضافة بنجاح!", description: "سيتم مراجعته خلال 3-5 أيام عمل." });
      onSuccess?.();
    } catch (err: any) {
      const message = err?.response?.data?.message || "تعذر إرسال الطلب. حاول مجددًا.";
      toast({ title: "خطأ", description: message, variant: "destructive" });
    }
  };

  const StepHeader = () => {
    const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{steps[stepIndex].title}</h2>
          <span className="text-sm text-muted-foreground">{stepIndex + 1} / {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  };

  const renderStep = () => {
    const k = steps[stepIndex].key;

    if (k === "basics")
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">اسم المخيم *</label>
              <Input value={form.basics.name} onChange={(e) => setForm((d) => ({ ...d, basics: { ...d.basics, name: e.target.value } }))} placeholder="مثال: مخيم الرمال الذهبية" />
            </div>
            <div>
              <label className="text-sm font-medium">نوع الملكية *</label>
              <Select value={form.basics.propertyType} onValueChange={(v) => setForm((d) => ({ ...d, basics: { ...d.basics, propertyType: v } }))}>
                <SelectTrigger><SelectValue placeholder="اختر النوع" /></SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">الموقع الإلكتروني (اختياري)</label>
              <Input value={form.basics.website || ""} onChange={(e) => setForm((d) => ({ ...d, basics: { ...d.basics, website: e.target.value } }))} placeholder="https://example.com" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">وصف المخيم *</label>
            <Textarea rows={4} value={form.description.summary} onChange={(e) => setForm((d) => ({ ...d, description: { ...d.description, summary: e.target.value } }))} placeholder="اكتب وصفاً جذاباً لمخيمك..." />
          </div>

          <div>
            <label className="text-sm font-medium">خدمات إضافية للضيوف (اختياري)</label>
            <Textarea rows={3} value={form.description.guestServices || ""} onChange={(e) => setForm((d) => ({ ...d, description: { ...d.description, guestServices: e.target.value } }))} placeholder="توصيل من المطار، جولات سياحية..." />
          </div>
        </div>
      );

    if (k === "location")
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">الدولة *</label>
              <Select value={form.location.country} onValueChange={(v) => setForm((d) => ({ ...d, location: { ...d.location, country: v } }))}>
                <SelectTrigger><SelectValue placeholder="اختر الدولة" /></SelectTrigger>
                <SelectContent>
                  {countriesList.map((ct) => <SelectItem key={ct.code} value={ct.label}>{ct.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">المحافظة/الولاية *</label>
              <Input value={form.location.state} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, state: e.target.value } }))} />
            </div>
            <div>
              <label className="text-sm font-medium">المدينة *</label>
              <Input value={form.location.city} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, city: e.target.value } }))} />
            </div>
            <div>
              <label className="text-sm font-medium">الرمز البريدي</label>
              <Input value={form.location.zip || ""} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, zip: e.target.value } }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">العنوان التفصيلي *</label>
              <Input value={form.location.street} onChange={(e) => setForm((d) => ({ ...d, location: { ...d.location, street: e.target.value } }))} placeholder="الشارع، المعالم القريبة..." />
            </div>
          </div>
        </div>
      );

    if (k === "description")
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium">تفاصيل إضافية (اختياري)</label>
          <Textarea rows={5} value={form.description.guestServices || ""} onChange={(e) => setForm((d) => ({ ...d, description: { ...d.description, guestServices: e.target.value } }))} placeholder="أدخل أي تفاصيل إضافية ترغب بعرضها." />
        </div>
      );

    if (k === "capacity") {
      const setBed = (key: string, val: number) =>
        setForm((d) => ({ ...d, capacity: { ...d.capacity, beds: { ...d.capacity.beds, [key]: Math.max(0, Math.min(20, val)) } } }));

      const totalBeds = Object.values(form.capacity.beds).reduce((s, v) => s + Number(v || 0), 0);

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">أقصى عدد ضيوف *</label>
              <Input type="number" min={1} value={form.capacity.maxGuests} onChange={(e) => setForm((d) => ({ ...d, capacity: { ...d.capacity, maxGuests: Math.max(1, Number(e.target.value) || 1) } }))} />
            </div>
            <div>
              <label className="text-sm font-medium">عدد غرف النوم</label>
              <Input type="number" min={0} value={form.capacity.bedrooms} onChange={(e) => setForm((d) => ({ ...d, capacity: { ...d.capacity, bedrooms: Math.max(0, Number(e.target.value) || 0) } }))} />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">أنواع الأسرّة المتوفرة</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bedTypes.map((b) => (
                <div key={b.key} className="flex items-center justify-between border rounded-lg p-3">
                  <span className="text-sm">{b.label}</span>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={() => setBed(b.key, (form.capacity.beds[b.key] || 0) - 1)}>−</Button>
                    <Input type="number" min={0} className="w-20 text-center" value={form.capacity.beds[b.key] || 0} onChange={(e) => setBed(b.key, Number(e.target.value) || 0)} />
                    <Button type="button" variant="outline" onClick={() => setBed(b.key, (form.capacity.beds[b.key] || 0) + 1)}>+</Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">إجمالي الأسرّة: {totalBeds}</p>
          </div>
        </div>
      );
    }

    if (k === "features")
      return (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-md font-semibold">الخدمات الأساسية</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {basicAmenities.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.features.amenities.basic.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.features.amenities.basic);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, basic: Array.from(arr) } } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold">مرافق الحمام</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {bathAmenities.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.features.amenities.bath.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.features.amenities.bath);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, bath: Array.from(arr) } } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold">مرافق المطبخ</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {kitchenAmenities.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.features.amenities.kitchen.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.features.amenities.kitchen);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, kitchen: Array.from(arr) } } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold">مرافق خارجية</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {outdoorAmenities.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.features.amenities.outdoor.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.features.amenities.outdoor);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, features: { ...d.features, amenities: { ...d.features.amenities, outdoor: Array.from(arr) } } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold">خدمات عامة</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {facilities.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.features.facilities.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.features.facilities);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, features: { ...d.features, facilities: Array.from(arr) } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );

    if (k === "environment")
      return (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-md font-semibold">نوع التضاريس</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {terrainOptions.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.environment.terrain.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.environment.terrain);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, environment: { ...d.environment, terrain: Array.from(arr) } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-md font-semibold">مستوى العزلة</label>
            <Select value={form.environment.seclusion || ""} onValueChange={(v) => setForm((d) => ({ ...d, environment: { ...d.environment, seclusion: v } }))}>
              <SelectTrigger><SelectValue placeholder="اختر مستوى العزلة" /></SelectTrigger>
              <SelectContent>
                {seclusionOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold">أنشطة متوفرة</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activities.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.environment.activities.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.environment.activities);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, environment: { ...d.environment, activities: Array.from(arr) } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-md font-semibold">مساحات مشتركة</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sharedSpaces.map((item) => (
                <label key={item} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox checked={form.environment.sharedSpaces.includes(item)} onCheckedChange={() => {
                    const arr = new Set(form.environment.sharedSpaces);
                    arr.has(item) ? arr.delete(item) : arr.add(item);
                    setForm((d) => ({ ...d, environment: { ...d.environment, sharedSpaces: Array.from(arr) } }));
                  }} />
                  <span className="text-sm cursor-pointer">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );

    if (k === "rulesPricing")
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-md font-semibold">أوقات الدخول والخروج</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">بداية وقت الدخول</label>
                <Input type="time" value={form.rules.checkInFrom} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, checkInFrom: e.target.value } }))} />
              </div>
              <div>
                <label className="text-sm font-medium">نهاية وقت الدخول</label>
                <Input type="time" value={form.rules.checkInTo} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, checkInTo: e.target.value } }))} />
              </div>
              <div>
                <label className="text-sm font-medium">وقت الخروج</label>
                <Input type="time" value={form.rules.checkOut} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, checkOut: e.target.value } }))} />
              </div>
              <div>
                <label className="text-sm font-medium">الحد الأدنى للعمر (سنة)</label>
                <Input type="number" min={0} value={form.rules.minAge} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, minAge: Math.max(0, Number(e.target.value) || 0) } }))} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold">التسعير (بالريال العماني) *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium text-center">الأيام العادية</h4>
                <div>
                  <label className="text-sm">مع المبيت</label>
                  <Input type="number" min={0} step="0.5" value={form.pricing.weekday_with_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, weekday_with_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
                </div>
                <div>
                  <label className="text-sm">بدون المبيت</label>
                  <Input type="number" min={0} step="0.5" value={form.pricing.weekday_without_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, weekday_without_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
                </div>
              </div>
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium text-center">أيام العطل والمناسبات</h4>
                <div>
                  <label className="text-sm">مع المبيت</label>
                  <Input type="number" min={0} step="0.5" value={form.pricing.holiday_with_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, holiday_with_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
                </div>
                <div>
                  <label className="text-sm">بدون المبيت</label>
                  <Input type="number" min={0} step="0.5" value={form.pricing.holiday_without_accommodation} onChange={(e) => setForm((d) => ({ ...d, pricing: { ...d.pricing, holiday_without_accommodation: Math.max(0, Number(e.target.value) || 0) } }))} />
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">اترك غير المتاح بقيمة 0.</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">قواعد وشروط إضافية (اختياري)</label>
            <Textarea rows={3} value={form.rules.additionalRules || ""} onChange={(e) => setForm((d) => ({ ...d, rules: { ...d.rules, additionalRules: e.target.value } }))} placeholder="مثال: هدوء بعد 10 م، ممنوع التدخين..." />
          </div>
        </div>
      );

    if (k === "images")
      return (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">صور المخيم *</label>
            <Input type="file" multiple accept="image/*" onChange={(e) => setForm((d) => ({ ...d, files: Array.from(e.target.files || []) }))} />
            <div className="text-xs text-muted-foreground mt-2">ارفع 5 صور على الأقل. الصورة الأولى ستكون الرئيسية.</div>
          </div>
          {form.files.length > 0 && <div className="text-sm text-green-600">تم اختيار {form.files.length} صورة</div>}
        </div>
      );

    if (k === "review") {
      const totalBeds = Object.values(form.capacity.beds || {}).reduce((s, v) => s + Number(v || 0), 0);
      return (
        <div className="space-y-6 text-sm">
          <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /> مراجعة البيانات قبل الإرسال</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">المخيم</h4>
              <div><strong>الاسم:</strong> {form.basics.name || "-"}</div>
              <div><strong>النوع:</strong> {form.basics.propertyType || "-"}</div>
              <div><strong>الموقع:</strong> {[form.location.city, form.location.state, form.location.country].filter(Boolean).join(", ") || "-"}</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">الوصف</h4>
              <div><strong>الملخص:</strong> {form.description.summary || "-"}</div>
              <div><strong>الخدمات:</strong> {form.description.guestServices || "-"}</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">السعة</h4>
              <div><strong>الضيوف:</strong> {form.capacity.maxGuests}</div>
              <div><strong>غرف النوم:</strong> {form.capacity.bedrooms}</div>
              <div><strong>إجمالي الأسرّة:</strong> {totalBeds}</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">التسعير</h4>
              <div><strong>عادي مع مبيت:</strong> {form.pricing.weekday_with_accommodation || 0}</div>
              <div><strong>عادي بدون مبيت:</strong> {form.pricing.weekday_without_accommodation || 0}</div>
              <div><strong>عطلة مع مبيت:</strong> {form.pricing.holiday_with_accommodation || 0}</div>
              <div><strong>عطلة بدون مبيت:</strong> {form.pricing.holiday_without_accommodation || 0}</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">الخدمات والبيئة</h4>
              <div><strong>أساسية:</strong> {(form.features.amenities.basic || []).length} عنصر</div>
              <div><strong>حمام:</strong> {(form.features.amenities.bath || []).length} عنصر</div>
              <div><strong>مطبخ:</strong> {(form.features.amenities.kitchen || []).length} عنصر</div>
              <div><strong>خارجية:</strong> {(form.features.amenities.outdoor || []).length} عنصر</div>
              <div><strong>تضاريس:</strong> {(form.environment.terrain || []).length} نوع</div>
              <div><strong>أنشطة:</strong> {(form.environment.activities || []).length} نشاط</div>
              <div><strong>عزلة:</strong> {form.environment.seclusion || "-"}</div>
              <div><strong>صور:</strong> {form.files.length}</div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div dir="rtl">
      <div className="rounded-lg border bg-card p-6">
        <StepHeader />
        {renderStep()}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" onClick={isFirst ? onCancel : prev} className="inline-flex items-center gap-2">
          <ChevronRight className="h-4 w-4 rotate-180" /> {isFirst ? "إلغاء" : "السابق"}
        </Button>
        {!isLast ? (
          <Button onClick={next} className="inline-flex items-center gap-2">
            التالي <ChevronLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={submit} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700">
            إرسال الطلب <CheckCircle2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
