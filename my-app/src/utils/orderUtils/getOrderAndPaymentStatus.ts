export const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case 'created':
      return 'default';
    case 'processing':
      return 'processing';
    case 'delivering':
      return 'warning';
    case 'done':
      return 'success';
    default:
      return 'default';
  }
};

export const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case 'payed':
      return 'success';
    case 'notpayed':
      return 'error';
    default:
      return 'default';
  }
};
