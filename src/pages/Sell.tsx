import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { CAR_MAKES, BODY_TYPES, FUEL_TYPES, AFRICAN_COUNTRIES, CONDITIONS, CAR_FEATURES } from '@/types';
import { 
  Car, 
  Upload, 
  X, 
  Camera, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const Sell = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    transmission: '',
    fuelType: '',
    bodyType: '',
    color: '',
    vin: '',
    condition: '',
    description: '',
    country: '',
    city: '',
    startingPrice: '',
    reservePrice: '',
    features: [] as string[],
  });

  const selectedMake = CAR_MAKES.find(m => m.name === formData.make);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In production, this would upload to Azure Blob Storage
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);
    try {
      // In production, this would send to Azure backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Your vehicle has been submitted for review!');
      navigate('/dashboard/my-listings');
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Vehicle Info' },
    { number: 2, title: 'Details' },
    { number: 3, title: 'Photos' },
    { number: 4, title: 'Pricing' },
  ];

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <Car className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold mb-4">
              Sell Your Vehicle
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign in to list your vehicle on Africa's premier auction platform.
            </p>
            <Button onClick={() => navigate('/auth')} className="btn-premium">
              Sign In to Continue
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              Sell Your <span className="text-gold-gradient">Vehicle</span>
            </h1>
            <p className="text-muted-foreground">
              Complete the form below to submit your vehicle for auction
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center gap-2 ${
                  currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.number 
                      ? 'bg-gradient-gold text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="card-premium p-8">
            {/* Step 1: Vehicle Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-semibold mb-6">Vehicle Information</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Make *</Label>
                    <Select value={formData.make} onValueChange={(v) => handleInputChange('make', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {CAR_MAKES.map(make => (
                          <SelectItem key={make.id} value={make.name}>{make.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Model *</Label>
                    <Select 
                      value={formData.model} 
                      onValueChange={(v) => handleInputChange('model', v)}
                      disabled={!formData.make}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMake?.models.map(model => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Year *</Label>
                    <Select value={formData.year} onValueChange={(v) => handleInputChange('year', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Mileage (km) *</Label>
                    <Input
                      type="number"
                      value={formData.mileage}
                      onChange={(e) => handleInputChange('mileage', e.target.value)}
                      placeholder="e.g., 25000"
                      className="input-premium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Transmission *</Label>
                    <Select value={formData.transmission} onValueChange={(v) => handleInputChange('transmission', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Fuel Type *</Label>
                    <Select value={formData.fuelType} onValueChange={(v) => handleInputChange('fuelType', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FUEL_TYPES.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setCurrentStep(2)} className="btn-premium">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-semibold mb-6">Additional Details</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Body Type *</Label>
                    <Select value={formData.bodyType} onValueChange={(v) => handleInputChange('bodyType', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BODY_TYPES.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Exterior Color *</Label>
                    <Input
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      placeholder="e.g., Black, White, Silver"
                      className="input-premium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Condition *</Label>
                    <Select value={formData.condition} onValueChange={(v) => handleInputChange('condition', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONDITIONS.map(condition => (
                          <SelectItem key={condition.id} value={condition.id}>
                            {condition.name} - {condition.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>VIN (Optional)</Label>
                    <Input
                      value={formData.vin}
                      onChange={(e) => handleInputChange('vin', e.target.value)}
                      placeholder="Vehicle Identification Number"
                      className="input-premium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Select value={formData.country} onValueChange={(v) => handleInputChange('country', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {AFRICAN_COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g., Lagos, Nairobi"
                      className="input-premium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your vehicle's condition, history, and any notable features..."
                    className="input-premium min-h-[150px]"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Features & Equipment</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {CAR_FEATURES.map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label htmlFor={feature} className="text-sm cursor-pointer">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="btn-premium">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-semibold mb-2">Photos</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Upload high-quality photos of your vehicle (minimum 5, maximum 10)
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 10 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors">
                      <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Photo Tips</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use good lighting (natural light is best)</li>
                        <li>Capture all angles: front, back, sides, interior</li>
                        <li>Include close-ups of any damage or wear</li>
                        <li>Show the odometer and VIN plate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)} className="btn-premium">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Pricing */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-semibold mb-6">Set Your Price</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Starting Price (USD) *</Label>
                    <Input
                      type="number"
                      value={formData.startingPrice}
                      onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                      placeholder="e.g., 50000"
                      className="input-premium"
                    />
                    <p className="text-xs text-muted-foreground">
                      The minimum bid amount for your auction
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Reserve Price (USD) - Optional</Label>
                    <Input
                      type="number"
                      value={formData.reservePrice}
                      onChange={(e) => handleInputChange('reservePrice', e.target.value)}
                      placeholder="e.g., 75000"
                      className="input-premium"
                    />
                    <p className="text-xs text-muted-foreground">
                      The minimum price you'll accept (hidden from buyers)
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Review Process</p>
                      <p className="text-muted-foreground">
                        Your submission will be reviewed by our team within 24-48 hours. 
                        We may contact you for additional information or photos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="btn-premium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit for Review'}
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

export default Sell;
