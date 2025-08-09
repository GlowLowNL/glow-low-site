"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/lib/mockApi"
import { ProductWithOffers } from "@/types/product"

export function Search() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")

  const router = useRouter();
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  // Debounce search input
  const handleSearchChange = (search: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchQuery(search), 250);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', { query: searchQuery }],
    queryFn: () => getProducts({ query: searchQuery }, 1, 5), // Fetch top 5 results
    enabled: searchQuery.length > 0, // Only run query if user has typed something
  });

  const products = data?.data || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between"
        >
          {value
            ? products.find((product) => product.name.toLowerCase() === value)?.name
            : "Zoek een product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command shouldFilter={false} aria-label="Product zoeken">
          <CommandInput 
            placeholder="Zoek op merk of productnaam..."
            onValueChange={handleSearchChange}
          />
          <CommandEmpty>{isLoading ? "Aan het zoeken..." : "Geen product gevonden."}</CommandEmpty>
          <CommandGroup heading="Producten">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name.toLowerCase()}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  router.push(`/product/${product.id}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === product.name.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
