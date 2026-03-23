import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import {
  Shield,
  CheckCircle2,
  Upload,
  Camera,
  User,
  CreditCard,
  FileText,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  MapPin,
  Info,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { toast } from 'sonner';

type KYCStep = 'intro' | 'personal' | 'nin-bvn' | 'documents' | 'selfie' | 'review' | 'submitted';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
  lga: string;
  state: string;
}

interface NinBvnInfo {
  nin: string;
  bvn: string;
}

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

const DOC_TYPES = [
  { id: 'nin_slip', label: "NIN Slip / e-ID Card", description: 'Your NIMC NIN slip or e-ID card' },
  { id: 'drivers_license', label: "Driver's License", description: "Valid Nigerian driver's license" },
  { id: 'passport', label: 'International Passport', description: 'Valid Nigerian passport' },
  { id: 'voters_card', label: "Voter's Card (PVC)", description: 'INEC Permanent Voter Card' },
];

const KYC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<KYCStep>('intro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNin, setShowNin] = useState(false);
  const [showBvn, setShowBvn] = useState(false);

  const [personal, setPersonal] = useState<PersonalInfo>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    lga: '',
    state: '',
  });

  const [ninBvn, setNinBvn] = useState<NinBvnInfo>({ nin: '', bvn: '' });
  const [docType, setDocType] = useState('');
  const [docFront, setDocFront] = useState<string | null>(null);
  const [docBack, setDocBack] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold mb-4">Identity Verification</h1>
          <p className="text-muted-foreground mb-8">Sign in to start your KYC verification.</p>
          <Button onClick={() => navigate('/auth')} className="btn-premium">Sign In</Button>
        </div>
      </Layout>
    );
  }

  const steps = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'nin-bvn', label: 'NIN & BVN', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'selfie', label: 'Selfie', icon: Camera },
    { id: 'review', label: 'Review', icon: CheckCircle2 },
  ];
  const stepIndex = steps.findIndex(s => s.id === step);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      setStep('submitted');
      toast.success("KYC submitted successfully! We'll verify within 24 hours.");
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'submitted') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Verification Submitted!</h1>
            <p className="text-muted-foreground mb-4">
              Your identity documents have been submitted for review. Our compliance team will verify your details within <strong className="text-foreground">24–48 business hours</strong>.
            </p>
            <div className="card-premium p-6 text-left mb-8 space-y-3">
              <h3 className="font-semibold">What happens next?</h3>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary text-xs font-bold">1</div>
                <span>We verify your NIN and BVN with NIMC and CBN databases.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary text-xs font-bold">2</div>
                <span>Your submitted documents are cross-checked with your details.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary text-xs font-bold">3</div>
                <span>You'll receive an email notification once your account is approved.</span>
              </div>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="btn-premium">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (step === 'intro') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">
                Verify Your <span className="text-gold-gradient">Identity</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                As required by Nigerian law and our compliance framework, all users must complete KYC (Know Your Customer) verification before bidding or listing vehicles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Lock, title: 'Secure & Encrypted', desc: 'Your data is encrypted with AES-256 and never shared with third parties without consent.' },
                { icon: Shield, title: 'NDPR Compliant', desc: 'We comply with the Nigerian Data Protection Regulation (NDPR) and CBN KYC guidelines.' },
                { icon: CheckCircle2, title: 'Fast Approval', desc: 'Most verifications are completed within 24–48 hours by our compliance team.' },
              ].map((item, i) => (
                <div key={i} className="card-premium p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="card-premium p-6 mb-8">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                What you'll need
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'National Identification Number (NIN)',
                  'Bank Verification Number (BVN)',
                  "Valid government-issued ID (Driver's License, Passport, or Voter's Card)",
                  'A clear selfie photo',
                  'Proof of Nigerian address',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Nigeria Launch:</strong> We are currently onboarding users in Nigeria only. Support for Ghana, Kenya, South Africa, and other countries is coming soon.
              </p>
            </div>

            <div className="text-center">
              <Button className="btn-premium text-lg px-10 py-6 gap-2" onClick={() => setStep('personal')}>
                Start Verification
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center gap-1 ${i <= stepIndex ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      i < stepIndex ? 'bg-gradient-gold text-primary-foreground' :
                      i === stepIndex ? 'bg-primary/20 border-2 border-primary text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {i < stepIndex ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                    </div>
                    <span className="text-xs hidden sm:block">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 ${i < stepIndex ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium p-8">
            {/* Step: Personal Info */}
            {step === 'personal' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-1">Personal Information</h2>
                  <p className="text-muted-foreground text-sm">Enter your details exactly as they appear on your government ID.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input value={personal.firstName} onChange={e => setPersonal(p => ({ ...p, firstName: e.target.value }))} placeholder="e.g., Damilola" className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <Input value={personal.lastName} onChange={e => setPersonal(p => ({ ...p, lastName: e.target.value }))} placeholder="e.g., Yinusa" className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <Input type="date" value={personal.dateOfBirth} onChange={e => setPersonal(p => ({ ...p, dateOfBirth: e.target.value }))} className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select value={personal.gender} onValueChange={v => setPersonal(p => ({ ...p, gender: v }))}>
                      <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Phone Number *</Label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 rounded-md border border-input bg-muted/30 text-sm text-muted-foreground shrink-0">
                        🇳🇬 +234
                      </div>
                      <Input value={personal.phone} onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))} placeholder="0800 123 4567" className="input-premium flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Residential Address *</Label>
                    <Input value={personal.address} onChange={e => setPersonal(p => ({ ...p, address: e.target.value }))} placeholder="House no., street name" className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label>Local Government Area (LGA) *</Label>
                    <Input value={personal.lga} onChange={e => setPersonal(p => ({ ...p, lga: e.target.value }))} placeholder="e.g., Ikeja" className="input-premium" />
                  </div>
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Select value={personal.state} onValueChange={v => setPersonal(p => ({ ...p, state: v }))}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button className="btn-premium gap-2" onClick={() => setStep('nin-bvn')}
                    disabled={!personal.firstName || !personal.lastName || !personal.dateOfBirth || !personal.gender || !personal.phone || !personal.state}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step: NIN & BVN */}
            {step === 'nin-bvn' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-1">NIN & BVN Verification</h2>
                  <p className="text-muted-foreground text-sm">Your NIN and BVN are used to verify your identity with NIMC and CBN databases.</p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-sm space-y-2">
                  <p className="font-medium">How to find your NIN:</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Dial <code className="px-1 py-0.5 rounded bg-muted text-primary">*346#</code> on any phone</li>
                    <li>Check your NIMC e-ID card or NIN slip</li>
                    <li>Visit any NIMC enrollment centre</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-sm space-y-2">
                  <p className="font-medium">How to find your BVN:</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Dial <code className="px-1 py-0.5 rounded bg-muted text-primary">*565*0#</code> on your registered bank phone</li>
                    <li>Log in to your bank's mobile app or USSD</li>
                    <li>Visit any branch of your bank</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>National Identification Number (NIN) *</Label>
                    <div className="relative">
                      <Input
                        type={showNin ? 'text' : 'password'}
                        value={ninBvn.nin}
                        onChange={e => setNinBvn(p => ({ ...p, nin: e.target.value.replace(/\D/g, '').slice(0, 11) }))}
                        placeholder="11-digit NIN"
                        className="input-premium pr-10"
                        maxLength={11}
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowNin(!showNin)}>
                        {showNin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{ninBvn.nin.length}/11 digits</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Verification Number (BVN) *</Label>
                    <div className="relative">
                      <Input
                        type={showBvn ? 'text' : 'password'}
                        value={ninBvn.bvn}
                        onChange={e => setNinBvn(p => ({ ...p, bvn: e.target.value.replace(/\D/g, '').slice(0, 11) }))}
                        placeholder="11-digit BVN"
                        className="input-premium pr-10"
                        maxLength={11}
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowBvn(!showBvn)}>
                        {showBvn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{ninBvn.bvn.length}/11 digits</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-muted/20 border border-border/30">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                  <span>Your NIN and BVN are encrypted in transit and at rest. They are used solely for identity verification and are never stored in plain text. We do not share them with any third party.</span>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep('personal')} className="gap-2"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button className="btn-premium gap-2" disabled={ninBvn.nin.length !== 11 || ninBvn.bvn.length !== 11}
                    onClick={() => setStep('documents')}>Continue <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </div>
            )}

            {/* Step: Documents */}
            {step === 'documents' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-1">Upload ID Document</h2>
                  <p className="text-muted-foreground text-sm">Upload clear photos of your government-issued ID. Ensure all text is legible.</p>
                </div>

                <div className="space-y-3">
                  <Label>Select Document Type *</Label>
                  <div className="grid gap-3">
                    {DOC_TYPES.map(doc => (
                      <button key={doc.id} type="button"
                        onClick={() => setDocType(doc.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${docType === doc.id ? 'border-primary bg-primary/10' : 'border-border/50 hover:border-primary/30 bg-card'}`}>
                        <p className="font-medium">{doc.label}</p>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {docType && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Front of Document *</Label>
                      <label className={`block aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${docFront ? 'border-primary/50' : 'border-border/50 hover:border-primary/30'}`}>
                        {docFront ? (
                          <img src={docFront} alt="Front" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Upload className="w-8 h-8" />
                            <span className="text-sm">Upload front side</span>
                            <span className="text-xs">JPG, PNG up to 5MB</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, setDocFront)} />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <Label>Back of Document {docType === 'passport' ? '(Optional)' : '*'}</Label>
                      <label className={`block aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${docBack ? 'border-primary/50' : 'border-border/50 hover:border-primary/30'}`}>
                        {docBack ? (
                          <img src={docBack} alt="Back" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Upload className="w-8 h-8" />
                            <span className="text-sm">Upload back side</span>
                            <span className="text-xs">JPG, PNG up to 5MB</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, setDocBack)} />
                      </label>
                    </div>
                  </div>
                )}

                <div className="card-premium p-4 bg-muted/20">
                  <p className="text-sm font-medium mb-2">Photo requirements:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Full document visible — no edges cut off</li>
                    <li>Well lit — no glare or shadows</li>
                    <li>In focus — all text clearly readable</li>
                    <li>Not expired — document must be valid</li>
                  </ul>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep('nin-bvn')} className="gap-2"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button className="btn-premium gap-2" disabled={!docType || !docFront}
                    onClick={() => setStep('selfie')}>Continue <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </div>
            )}

            {/* Step: Selfie */}
            {step === 'selfie' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-1">Selfie Verification</h2>
                  <p className="text-muted-foreground text-sm">Take a clear selfie photo to verify you match your ID document.</p>
                </div>

                <div className="space-y-4">
                  <label className={`block aspect-square max-w-xs mx-auto rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${selfie ? 'border-primary/50' : 'border-border/50 hover:border-primary/30'}`}>
                    {selfie ? (
                      <img src={selfie} alt="Selfie" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground p-8">
                        <Camera className="w-16 h-16 opacity-50" />
                        <span className="text-sm text-center">Click to upload a selfie photo</span>
                        <span className="text-xs text-center">Face must be clearly visible</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" capture="user" className="hidden" onChange={e => handleFileUpload(e, setSelfie)} />
                  </label>

                  <div className="card-premium p-4 bg-muted/20">
                    <p className="text-sm font-medium mb-3">Selfie guidelines:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { ok: true, text: 'Face clearly visible' },
                        { ok: true, text: 'Good lighting' },
                        { ok: true, text: 'Neutral expression' },
                        { ok: true, text: 'No sunglasses' },
                        { ok: false, text: 'No hat or cap' },
                        { ok: false, text: 'No heavy filters' },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs ${item.ok ? 'text-success' : 'text-destructive'}`}>
                          {item.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep('documents')} className="gap-2"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button className="btn-premium gap-2" disabled={!selfie} onClick={() => setStep('review')}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step: Review */}
            {step === 'review' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-1">Review & Submit</h2>
                  <p className="text-muted-foreground text-sm">Please review your information before submitting.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Personal Info</h4>
                      <button className="text-xs text-primary hover:underline" onClick={() => setStep('personal')}>Edit</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground">Name:</span> <span>{personal.firstName} {personal.lastName}</span></div>
                      <div><span className="text-muted-foreground">DOB:</span> <span>{personal.dateOfBirth}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span>+234 {personal.phone}</span></div>
                      <div><span className="text-muted-foreground">State:</span> <span>{personal.state}</span></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> NIN & BVN</h4>
                      <button className="text-xs text-primary hover:underline" onClick={() => setStep('nin-bvn')}>Edit</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground">NIN:</span> <span>{'*'.repeat(7)}{ninBvn.nin.slice(-4)}</span></div>
                      <div><span className="text-muted-foreground">BVN:</span> <span>{'*'.repeat(7)}{ninBvn.bvn.slice(-4)}</span></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Documents</h4>
                      <button className="text-xs text-primary hover:underline" onClick={() => setStep('documents')}>Edit</button>
                    </div>
                    <div className="flex gap-3">
                      {docFront && <img src={docFront} alt="Front" className="w-20 h-14 object-cover rounded-lg" />}
                      {docBack && <img src={docBack} alt="Back" className="w-20 h-14 object-cover rounded-lg" />}
                      {selfie && <img src={selfie} alt="Selfie" className="w-14 h-14 object-cover rounded-full" />}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border/30 text-sm text-muted-foreground">
                  By submitting, you confirm that all information provided is accurate and you consent to AfriAuto verifying your identity with NIMC and CBN in accordance with our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and the Nigerian Data Protection Regulation (NDPR).
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep('selfie')} className="gap-2"><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button className="btn-premium gap-2" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <><Shield className="w-4 h-4" /> Submit Verification</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KYC;
