package com.vzh.iherych.Service;

import com.vzh.iherych.Model.Fact;
import com.vzh.iherych.Repository.FactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FactService {
    private final FactRepository factRepository;

    public Fact save(Fact fact) {
        log.info("Fact : " + fact.getFact());
        if(fact.getFact() == null || fact.getFact().isEmpty()) {
            return null;
        }
        return factRepository.save(fact);
    }

    public void delete(Long id) {
        factRepository.deleteById(id);
    }

    public Fact findRandomFact() {
        long qty = factRepository.count();
        int idx = (int)(Math.random() * qty);
        Page<Fact> questionPage = factRepository.findAll(PageRequest.of(idx, 1));
        Fact q = null;
        if (questionPage.hasContent()) {
            q = questionPage.getContent().get(0);
        }
        return q;
    }

}
