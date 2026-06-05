using System.Linq.Expressions;
using FirstLoveChurch.API.Data;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Common;
using Microsoft.EntityFrameworkCore;

namespace FirstLoveChurch.API.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id, string? includeProperties = null)
    {
        IQueryable<T> query = _dbSet;
        query = ApplyIncludes(query, includeProperties);
        return await query.FirstOrDefaultAsync(e => e.Id == id);
    }

    public virtual async Task<IReadOnlyList<T>> GetAllAsync(string? includeProperties = null)
    {
        IQueryable<T> query = _dbSet;
        query = ApplyIncludes(query, includeProperties);
        return await query.OrderByDescending(e => e.CreatedAt).ToListAsync();
    }

    public virtual async Task<PagedResult<T>> GetPagedAsync(
        PaginationParams paginationParams,
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        string? includeProperties = null)
    {
        IQueryable<T> query = _dbSet;

        if (filter != null)
            query = query.Where(filter);

        query = ApplyIncludes(query, includeProperties);

        var totalCount = await query.CountAsync();

        if (orderBy != null)
            query = orderBy(query);
        else
            query = query.OrderByDescending(e => e.CreatedAt);

        var items = await query
            .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
            .Take(paginationParams.PageSize)
            .ToListAsync();

        return new PagedResult<T>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = paginationParams.PageNumber,
            PageSize = paginationParams.PageSize
        };
    }

    public virtual async Task<IReadOnlyList<T>> FindAsync(Expression<Func<T, bool>> predicate, string? includeProperties = null)
    {
        IQueryable<T> query = _dbSet.Where(predicate);
        query = ApplyIncludes(query, includeProperties);
        return await query.ToListAsync();
    }

    public virtual async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, string? includeProperties = null)
    {
        IQueryable<T> query = _dbSet;
        query = ApplyIncludes(query, includeProperties);
        return await query.FirstOrDefaultAsync(predicate);
    }

    public virtual async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public virtual async Task AddRangeAsync(IEnumerable<T> entities)
    {
        await _dbSet.AddRangeAsync(entities);
    }

    public virtual void Update(T entity)
    {
        _dbSet.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }

    public virtual void Delete(T entity)
    {
        entity.IsDeleted = true;
        entity.DeletedAt = DateTime.UtcNow;
        Update(entity);
    }

    public virtual void HardDelete(T entity)
    {
        _dbSet.Remove(entity);
    }

    public virtual async Task<bool> ExistsAsync(Guid id)
    {
        return await _dbSet.AnyAsync(e => e.Id == id);
    }

    public virtual async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.AnyAsync(predicate);
    }

    public virtual async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null)
    {
        return predicate == null
            ? await _dbSet.CountAsync()
            : await _dbSet.CountAsync(predicate);
    }

    public virtual IQueryable<T> Query(bool includeDeleted = false)
    {
        return includeDeleted
            ? _dbSet.IgnoreQueryFilters()
            : _dbSet.AsQueryable();
    }

    private static IQueryable<T> ApplyIncludes(IQueryable<T> query, string? includeProperties)
    {
        if (string.IsNullOrWhiteSpace(includeProperties))
            return query;

        foreach (var includeProperty in includeProperties.Split(',', StringSplitOptions.RemoveEmptyEntries))
        {
            query = query.Include(includeProperty.Trim());
        }

        return query;
    }
}
