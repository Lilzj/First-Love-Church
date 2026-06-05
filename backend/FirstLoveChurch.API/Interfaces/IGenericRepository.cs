using System.Linq.Expressions;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id, string? includeProperties = null);
    Task<IReadOnlyList<T>> GetAllAsync(string? includeProperties = null);
    Task<PagedResult<T>> GetPagedAsync(PaginationParams paginationParams,
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        string? includeProperties = null);
    Task<IReadOnlyList<T>> FindAsync(Expression<Func<T, bool>> predicate, string? includeProperties = null);
    Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, string? includeProperties = null);
    Task<T> AddAsync(T entity);
    Task AddRangeAsync(IEnumerable<T> entities);
    void Update(T entity);
    void Delete(T entity);
    void HardDelete(T entity);
    Task<bool> ExistsAsync(Guid id);
    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);
    Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null);
    IQueryable<T> Query(bool includeDeleted = false);
}
