function sortByKey(arr, key, { desc = false, locale = undefined } = {}) {
  return [...arr].sort((a, b) => {
    const av = a?.[key];
    const bv = b?.[key];

    // Handle undefined/null consistently
    if (av == null && bv == null) return 0;
    if (av == null) return desc ? -1 : 1;
    if (bv == null) return desc ? 1 : -1;

    // String compare
    if (typeof av === 'string' && typeof bv === 'string') {
      const cmp = locale
        ? av.localeCompare(bv, locale)
        : av.localeCompare(bv);
      return desc ? -cmp : cmp;
    }

    // Date compare
    if (av instanceof Date && bv instanceof Date) {
      const cmp = av.getTime() - bv.getTime();
      return desc ? -cmp : cmp;
    }

    // Numeric fallback
    if (!isNaN(av) && !isNaN(bv)) {
      const cmp = Number(av) - Number(bv);
      return desc ? -cmp : cmp;
    }

    // Fallback to default JS ordering
    const cmp = String(av).localeCompare(String(bv));
    return desc ? -cmp : cmp;
  });
}

// Example:
// const data = [{ id: 3 }, { id: 1 }, { id: 2 }];
// const sorted = sortByKey(data, 'id'); // [{id:1},{id:2},{id:3}]