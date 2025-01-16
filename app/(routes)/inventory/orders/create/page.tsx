import { DrumLabel } from "@/components/features/barcodes/DrumLabel";

import { CustomForm } from "@/components/shared/form/CustomForm";

const CreateOrderPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ERROR: {error}
        </div>
      )}

      <div className="bg-transparent p-8 rounded-md shadow-lg">
        <CustomForm
          endpoint="/api/inventory/orders"
          method="POST"
          fields={fields}
          onSuccess={(data: OrderPostResponse) => {
            setOrderData(data);
          }}
          onError={handleError}
        />
      </div>

      {orderData && (
        <div className="bg-slate-800 text-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Order Created Successfully
          </h2>
          <DrumLabel order={orderData} onError={setError} />
        </div>
      )}
    </div>
  );
};

export default CreateOrderPage;
