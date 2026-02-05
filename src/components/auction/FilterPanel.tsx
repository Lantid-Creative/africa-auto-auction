import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FilterOptions, CAR_MAKES, BODY_TYPES, FUEL_TYPES, AFRICAN_COUNTRIES, CONDITIONS } from '@/types';
import { Filter, X, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterPanel = ({ filters, onFiltersChange, onReset }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([filters.priceMin || 0, filters.priceMax || 500000]);
  const [yearRange, setYearRange] = useState([filters.yearMin || 2000, filters.yearMax || 2024]);

  const handleMakeChange = (make: string, checked: boolean) => {
    const currentMakes = filters.makes || [];
    const newMakes = checked
      ? [...currentMakes, make]
      : currentMakes.filter(m => m !== make);
    onFiltersChange({ ...filters, makes: newMakes });
  };

  const handleBodyTypeChange = (type: string, checked: boolean) => {
    const current = filters.bodyType || [];
    const updated = checked ? [...current, type] : current.filter(t => t !== type);
    onFiltersChange({ ...filters, bodyType: updated });
  };

  const handleFuelTypeChange = (type: string, checked: boolean) => {
    const current = filters.fuelType || [];
    const updated = checked ? [...current, type] : current.filter(t => t !== type);
    onFiltersChange({ ...filters, fuelType: updated });
  };

  const handleTransmissionChange = (type: string, checked: boolean) => {
    const current = filters.transmission || [];
    const updated = checked ? [...current, type] : current.filter(t => t !== type);
    onFiltersChange({ ...filters, transmission: updated });
  };

  const handleCountryChange = (country: string, checked: boolean) => {
    const current = filters.location || [];
    const updated = checked ? [...current, country] : current.filter(c => c !== country);
    onFiltersChange({ ...filters, location: updated });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const current = filters.condition || [];
    const updated = checked ? [...current, condition] : current.filter(c => c !== condition);
    onFiltersChange({ ...filters, condition: updated });
  };

  const applyPriceRange = () => {
    onFiltersChange({ ...filters, priceMin: priceRange[0], priceMax: priceRange[1] });
  };

  const applyYearRange = () => {
    onFiltersChange({ ...filters, yearMin: yearRange[0], yearMax: yearRange[1] });
  };

  const activeFiltersCount = Object.values(filters).filter(v => 
    Array.isArray(v) ? v.length > 0 : v !== undefined
  ).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['make', 'price', 'year']} className="w-full">
        {/* Make */}
        <AccordionItem value="make">
          <AccordionTrigger className="text-sm font-medium">Make</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {CAR_MAKES.map((make) => (
                <div key={make.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`make-${make.id}`}
                    checked={filters.makes?.includes(make.name)}
                    onCheckedChange={(checked) => handleMakeChange(make.name, !!checked)}
                  />
                  <Label htmlFor={`make-${make.id}`} className="text-sm cursor-pointer">
                    {make.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-1">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={500000}
                step={5000}
                className="mt-2"
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Min</Label>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="input-premium mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Max</Label>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="input-premium mt-1"
                  />
                </div>
              </div>
              <Button onClick={applyPriceRange} size="sm" variant="outline" className="w-full">
                Apply Price Range
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Year Range */}
        <AccordionItem value="year">
          <AccordionTrigger className="text-sm font-medium">Year</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-1">
              <Slider
                value={yearRange}
                onValueChange={setYearRange}
                min={1990}
                max={2024}
                step={1}
                className="mt-2"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
              <Button onClick={applyYearRange} size="sm" variant="outline" className="w-full">
                Apply Year Range
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Body Type */}
        <AccordionItem value="body">
          <AccordionTrigger className="text-sm font-medium">Body Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {BODY_TYPES.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`body-${type.id}`}
                    checked={filters.bodyType?.includes(type.id)}
                    onCheckedChange={(checked) => handleBodyTypeChange(type.id, !!checked)}
                  />
                  <Label htmlFor={`body-${type.id}`} className="text-sm cursor-pointer">
                    {type.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Fuel Type */}
        <AccordionItem value="fuel">
          <AccordionTrigger className="text-sm font-medium">Fuel Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {FUEL_TYPES.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fuel-${type.id}`}
                    checked={filters.fuelType?.includes(type.id)}
                    onCheckedChange={(checked) => handleFuelTypeChange(type.id, !!checked)}
                  />
                  <Label htmlFor={`fuel-${type.id}`} className="text-sm cursor-pointer">
                    {type.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Transmission */}
        <AccordionItem value="transmission">
          <AccordionTrigger className="text-sm font-medium">Transmission</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {['automatic', 'manual'].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`trans-${type}`}
                    checked={filters.transmission?.includes(type)}
                    onCheckedChange={(checked) => handleTransmissionChange(type, !!checked)}
                  />
                  <Label htmlFor={`trans-${type}`} className="text-sm cursor-pointer capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Condition */}
        <AccordionItem value="condition">
          <AccordionTrigger className="text-sm font-medium">Condition</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {CONDITIONS.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition.id}`}
                    checked={filters.condition?.includes(condition.id)}
                    onCheckedChange={(checked) => handleConditionChange(condition.id, !!checked)}
                  />
                  <Label htmlFor={`condition-${condition.id}`} className="text-sm cursor-pointer">
                    {condition.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location */}
        <AccordionItem value="location">
          <AccordionTrigger className="text-sm font-medium">Location</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {AFRICAN_COUNTRIES.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={filters.location?.includes(country)}
                    onCheckedChange={(checked) => handleCountryChange(country, !!checked)}
                  />
                  <Label htmlFor={`country-${country}`} className="text-sm cursor-pointer">
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={onReset} variant="outline" className="w-full gap-2">
        <RotateCcw className="w-4 h-4" />
        Reset All Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 card-premium p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {activeFiltersCount} active
              </span>
            )}
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FilterPanel;
