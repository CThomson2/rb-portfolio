"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X, ExternalLink, ShoppingCart } from "lucide-react";
// import { Text, Flex, Box, VStack } from "@chakra-ui/react";
// import {
//   DialogBody,
//   DialogCloseTrigger,
//   DialogRoot,
//   DialogTitle,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
// } from "@/components/ui/dialog";
// import { DataListItem, DataListRoot } from "@/components/ui/data-list";
// import { Button } from "@/components/ui/button";
import { ProductWithPrices } from "@/types/database/products";
// Import SVG graphic icons
import modalLg from "@public/img/product/modal-lg.png";
import modalMd from "@public/img/product/modal-md.png";
import modalSm from "@public/img/product/modal-sm.png";
import { useRouter } from "next/navigation";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductWithPrices | null;
}

export default function ProductDialog({
  isOpen,
  onClose,
  product,
}: ProductModalProps) {
  const router = useRouter();

  // Disable scroll on the body while the modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = originalStyle;
    }

    // Cleanup function to reset the overflow style
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const handleViewDetails = (productId: number) => {
    onClose();
    router.push(`/products/${productId}`);
  };

  if (!product) return null;

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={onClose}
      placement="center"
      motionPreset="slide-in-bottom"
      preventScroll={true}
    >
      <DialogContent
        maxW="600px"
        mx="auto"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
        // className={styles.dialogRoot}
        data-visible={isOpen}
        className={`fixed flex items-center justify-center z-50 bg-white rounded-lg shadow-lg h-fit max-h-[800px]`}
      >
        <DialogHeader>
          <DialogTitle
            fontSize="2xl"
            fontWeight="bold"
            className="text-lg font-medium pt-2 mb-2 mt-2 uppercase tracking-wide block text-center"
          >
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-2 text-center">
            {/* Product Details */}
            <div className="space-y-2">
              <Text className="text-lg font-medium pt-2 mb-2 mt-2 uppercase tracking-wide block text-center">
                {product.sku}
              </Text>
              <Text className="text-lg font-medium pt-5 mb-2 mt-2 uppercase tracking-wide block text-center">
                Grade - {product.grade}
              </Text>
            </div>
          </div>

          <Flex justify="center" mt={4} gap={6}>
            {product.product_prices.map((price, index) => (
              <VStack key={price.bottle_size_id} gap={2}>
                <Image
                  src={index === 0 ? modalSm : index === 1 ? modalMd : modalLg}
                  alt={price.bottle_sizes.volume}
                  width={150}
                  height={150}
                />
                <Text fontSize="md">{price.bottle_sizes.volume}</Text>
                <Text fontSize="md" fontWeight="bold">
                  £{Number(price.price).toFixed(2)}
                </Text>
              </VStack>
            ))}
          </Flex>
        </DialogBody>
        <Flex
          direction="column"
          position="absolute"
          top="4"
          right="2.5"
          gap="4"
          align="center"
        >
          <DialogCloseTrigger
            top="0"
            insetEnd="-14"
            bg="bg"
            border="none"
            onClick={onClose}
            _hover={{ bg: "gray.200" }}
            className="w-full flex items-center justify-center"
            asChild
          >
            <X className="flex items-center justify-center" size={24} />
          </DialogCloseTrigger>
          <Button
            variant="solid"
            onClick={() => handleViewDetails(product.product_id)}
            className="bg-black text-white hover:bg-gray-800 w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button
            variant="solid"
            className="bg-black text-white hover:bg-gray-800 w-full flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
}
